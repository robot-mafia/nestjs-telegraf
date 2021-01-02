import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Injectable as IInjectable } from '@nestjs/common/interfaces/injectable.interface';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { PipesContextCreator } from '@nestjs/core/pipes/pipes-context-creator';
import { PipesConsumer } from '@nestjs/core/pipes/pipes-consumer';
import { GuardsContextCreator } from '@nestjs/core/guards/guards-context-creator';
import { GuardsConsumer } from '@nestjs/core/guards/guards-consumer';
import { InterceptorsContextCreator } from '@nestjs/core/interceptors/interceptors-context-creator';
import { InterceptorsConsumer } from '@nestjs/core/interceptors/interceptors-consumer';
import { isFunction, isNil } from '@nestjs/common/utils/shared.utils';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, mergeAll } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Context, Telegraf } from 'telegraf';
import { TelegrafMetadataAccessor } from '../telegraf.metadata-accessor';
import { TelegrafContextCreator } from '../context/telegraf-context-creator';
import { TelegrafProxy } from '../context/telegraf-proxy';
import { FiltersContextCreator } from '../context/filters-context-creator';

@Injectable()
export class TelegrafUpdateExplorer implements OnModuleInit {
  private readonly contextCreator: TelegrafContextCreator;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly modulesContainer: ModulesContainer,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: TelegrafMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
    @Inject(Telegraf) private readonly telegraf: Telegraf<never>,
  ) {
    this.contextCreator = this.getContextCreator();
  }

  private getContextCreator(): TelegrafContextCreator {
    const { container } = this.moduleRef as any;
    return new TelegrafContextCreator(
      new TelegrafProxy(),
      new FiltersContextCreator(container),
      new PipesContextCreator(container),
      new PipesConsumer(),
      new GuardsContextCreator(container),
      new GuardsConsumer(),
      new InterceptorsContextCreator(container),
      new InterceptorsConsumer(),
    );
  }

  onModuleInit(): void {
    this.explore();
  }

  private explore(): void {
    this.modulesContainer.forEach(({ providers }, moduleName) => {
      this.exploreProviders(providers, moduleName);
    });
  }

  private exploreProviders(
    providers: Map<string, InstanceWrapper<IInjectable>>,
    moduleName: string,
  ): void {
    [...providers.values()]
      .filter((wrapper) => wrapper && !wrapper.isNotMetatype)
      .forEach((wrapper) => {
        const { instance } = wrapper;

        const prototype = Object.getPrototypeOf(instance);
        this.metadataScanner.scanFromPrototype(
          instance,
          prototype,
          (methodKey: string) =>
            this.registerIfListener(
              instance as Record<string, Function>,
              methodKey,
              moduleName,
            ),
        );
      });
  }

  private registerIfListener(
    instance: Record<string, Function>,
    methodKey: string,
    moduleName: string,
  ): void {
    const methodRef = instance[methodKey] as (...args: unknown[]) => unknown;
    const contextHandlerFn = this.contextCreator.create(
      instance,
      methodRef,
      moduleName,
      methodKey,
    );

    const listenerMetadata = this.metadataAccessor.getListenerMetadata(
      methodRef,
    );
    if (!listenerMetadata) return;

    const { method, args } = listenerMetadata;
    this.telegraf[method](
      ...args,
      async (ctx: Context, next: () => Promise<void>) => {
        const defferedResult = contextHandlerFn.call(instance, ctx, next);
        const result = this.pickResult(defferedResult);
        fromPromise(result)
          .pipe(
            mergeAll(),
            filter((response: any) => !isNil(response)),
          )
          .subscribe((text) => {
            // TODO: More processing method return logic (files, images, etc)
            // Example: https://github.com/nestjs/nest/blob/01dc358aade27d3d7ca510506696aa62bfb1cc43/packages/platform-socket.io/adapters/io-adapter.ts#L56
            return ctx.reply(text);
          });
      },
    );
  }

  private async pickResult(
    defferedResult: Promise<any>,
  ): Promise<Observable<any>> {
    const result = await defferedResult;

    if (result && isFunction(result.subscribe)) {
      return result;
    }

    if (result instanceof Promise) {
      return fromPromise(result);
    }

    return of(result);
  }
}

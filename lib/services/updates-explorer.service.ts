import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { MetadataAccessorService } from './metadata-accessor.service';
import {
  TELEGRAF_BOT_NAME,
  TELEGRAF_MODULE_OPTIONS,
} from '../telegraf.constants';
import { Telegraf } from 'telegraf';
import { TelegrafModuleOptions } from '../interfaces';
import { BaseExplorerService } from './base-explorer.service';
import { Module } from '@nestjs/core/injector/module';

@Injectable()
export class UpdatesExplorerService
  extends BaseExplorerService
  implements OnModuleInit {
  constructor(
    @Inject(TELEGRAF_BOT_NAME)
    private readonly botName: string,
    @Inject(TELEGRAF_MODULE_OPTIONS)
    private readonly telegrafModuleOptions: TelegrafModuleOptions,
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
  ) {
    super();
  }

  private bot: Telegraf<any>;

  onModuleInit(): void {
    this.bot = this.moduleRef.get<Telegraf<any>>(this.botName, {
      strict: false,
    });
    this.explore();
  }

  explore() {
    const modules = this.getModules(
      this.modulesContainer,
      this.telegrafModuleOptions.include || [],
    );
    const updates = this.flatMap(modules, (instance, moduleRef) =>
      this.applyUpdates(instance, moduleRef),
    );
  }

  private applyUpdates(wrapper: InstanceWrapper, moduleRef: Module) {
    const { instance } = wrapper;
    if (!instance) {
      return undefined;
    }
    const prototype = Object.getPrototypeOf(instance);

    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    const updateProviders: InstanceWrapper[] = providers.filter(
      (wrapper: InstanceWrapper) =>
        this.metadataAccessor.isUpdate(wrapper.metatype),
    );

    updateProviders.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;
      if (!instance) {
        return undefined;
      }
      this.metadataScanner.scanFromPrototype(instance, prototype, (name) => {
        const methodRef = instance[name];
        if (this.metadataAccessor.isUpdateListener(methodRef)) {
          const metadata = this.metadataAccessor.getListenerMetadata(methodRef);
          const middlewareFn = methodRef.bind(instance);
          const { method, args } = metadata;
          // NOTE: Use "any" to disable "Expected at least 1 arguments, but got 1 or more." error.
          // Use telegraf instance for non-scene listeners
          (this.bot[method] as any)(...args, middlewareFn);
        }
      });
    });
  }
}

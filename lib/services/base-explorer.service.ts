import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { flattenDeep, groupBy, identity, isEmpty, mapValues } from 'lodash';
import { UpdateMetadata } from '../interfaces';

export class BaseExplorerService {
  getModules(
    modulesContainer: Map<string, Module>,
    include: Function[],
  ): Module[] {
    if (!include || isEmpty(include)) {
      return [...modulesContainer.values()];
    }
    const whitelisted = this.includeWhitelisted(modulesContainer, include);
    return whitelisted;
  }

  includeWhitelisted(
    modulesContainer: Map<string, Module>,
    include: Function[],
  ): Module[] {
    const modules = [...modulesContainer.values()];
    return modules.filter(({ metatype }) =>
      include.some((item) => item === metatype),
    );
  }

  flatMap<T = UpdateMetadata>(
    modules: Module[],
    callback: (instance: InstanceWrapper, moduleRef: Module) => T | T[],
  ): T[] {
    const invokeMap = () => {
      return modules.map((moduleRef) => {
        const providers = [...moduleRef.providers.values()];
        return providers.map((wrapper) => callback(wrapper, moduleRef));
      });
    };
    return flattenDeep(invokeMap()).filter(identity);
  }

  groupMetadata(resolvers: UpdateMetadata[]) {
    const groupByType = groupBy(
      resolvers,
      (metadata: UpdateMetadata) => metadata.type,
    );
    const groupedMetadata = mapValues(
      groupByType,
      (resolversArr: UpdateMetadata[]) =>
        resolversArr.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.name]: curr.callback,
          }),
          {},
        ),
    );
    return groupedMetadata;
  }
}

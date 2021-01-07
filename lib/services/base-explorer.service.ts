import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { flattenDeep, identity, isEmpty } from 'lodash';

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
    return modules.filter(({ metatype }) => include.includes(metatype));
  }

  flatMap<T>(
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
}

import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { flattenDeep, identity, isEmpty } from 'lodash';

export class BaseExplorerService {
  getModules(
    modulesContainer: Map<string, Module>,
    include: Function[]
  ): Module[] {
    if (!include || isEmpty(include)) {
      return [...modulesContainer.values()];
    }
    return this.includeWhitelisted(modulesContainer, include);
  }

  includeWhitelisted(
    modulesContainer: Map<string, Module>,
    include: Function[]
  ): Module[] {
    const modules = [...modulesContainer.values()];
    return modules.filter(({ metatype }) => include.includes(metatype));
  }

  flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper, moduleRef: Module) => T | T[]
  ): T[] {
    const visitedModules = new Set<Module>();

    const unwrap = (moduleRef: Module) => {
      // protection from circular recursion
      if (visitedModules.has(moduleRef)) {
        return [];
      } else {
        visitedModules.add(moduleRef);
      }

      const providers = [...moduleRef.providers.values()];
      const defined = providers.map(wrapper => callback(wrapper, moduleRef));

      const imported: (T | T[])[] = moduleRef.imports?.size
        ? [...moduleRef.imports.values()].reduce((prev, cur) => {
            return [...prev, ...unwrap(cur)];
          }, [])
        : [];

      return [...defined, ...imported];
    };

    return flattenDeep(modules.map(unwrap)).filter(identity);
  }
}

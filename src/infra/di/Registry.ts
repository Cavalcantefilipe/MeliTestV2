export default class Registry {
  private static instance: Registry;
  private dependencies: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): Registry {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }

  provide(name: string, dependency: any): void {
    this.dependencies.set(name, dependency);
  }

  inject(name: string): any {
    return this.dependencies.get(name);
  }
}
import { SurveyModel } from "survey-core";

declare type VisualizerConstructor = new (
  targetElement: HTMLElement,
  survey: SurveyModel,
  questionName: string,
  data: Array<{ [index: string]: any }>,
  options?: Object
) => any;

export class VisualizationManager {
  static vizualizers: { [index: string]: Array<VisualizerConstructor> } = {};
  static registerVisualizer(
    typeName: string,
    constructor: VisualizerConstructor
  ) {
    let vizualizers = VisualizationManager.vizualizers[typeName];
    if (!vizualizers) {
      vizualizers = [];
      VisualizationManager.vizualizers[typeName] = vizualizers;
    }
    vizualizers.push(constructor);
  }
  static getVisualizers(typeName: string) {
    let vizualizers = VisualizationManager.vizualizers[typeName];
    if (!vizualizers) {
      return [VisualizerBase];
    }
    return vizualizers;
  }
}

export class VisualizerBase {
  constructor(
    protected targetElement: HTMLElement,
    survey: SurveyModel,
    questionName: string,
    data: Array<{ [index: string]: any }>,
    options?: Object
  ) {}

  destroy() {}

  render() {
    this.targetElement.innerHTML = "This question type is not vesualized yet";
  }
}

import { MapUtils } from '../../../utils/MapUtils';
import { Multitoken } from './Multitoken';

export class MultitokenImpl implements Multitoken {

  private tokensWeight: Map<string, number> = new Map();
  private tokensAmount: Map<string, number> = new Map();
  private maxWeight: number;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public setup(amounts: Map<string, number>, weights: Map<string, number>): void {
    this.tokensAmount = MapUtils.clone(amounts);
    this.tokensWeight = MapUtils.clone(weights);

    this.maxWeight = 0;
    weights.forEach(value => this.maxWeight += value);
  }

  public preCalculateExchange(fromSymbol: string, toSymbol: string, amount: number): [number, number] {
    const fromBalance: number = this.tokensAmount.get(fromSymbol) || 0;
    const fromWeight: number = this.tokensWeight.get(fromSymbol) || 0;
    const toBalance: number = this.tokensAmount.get(toSymbol) || 0;
    const toWeight: number = this.tokensWeight.get(toSymbol) || 0;

    const from = (fromBalance / ((fromWeight / this.maxWeight) * 100)) * 100;
    const to = (toBalance / ((toWeight / this.maxWeight) * 100)) * 100;
    let percent = (from - to) / (from + to + amount);

    if (percent <= 0) {
      percent = 1 - -percent;
    }

    return [
      toBalance *
      amount *
      fromWeight /
      ((fromBalance + amount) * toWeight) * percent,
      percent
    ];
  }

  public exchange(fromSymbol: string, toSymbol: string, fromAmount: number, toAmount: number): void {
    const fromAmounts: number = this.tokensAmount.get(fromSymbol) || 0;
    const toAmounts: number = this.tokensAmount.get(toSymbol) || 0;
    const fromResult: number = fromAmounts + fromAmount;
    const toResult: number = toAmounts - toAmount;

    if (fromResult <= 0 || toResult <= 0) {
      console.log(fromSymbol, toAmount, fromAmount, toAmount);
      console.log(fromAmounts, fromResult);
      console.log(toAmounts, toResult);
      throw new Error('wrong calculation');
    }

    this.tokensAmount.set(fromSymbol, fromResult);
    this.tokensAmount.set(toSymbol, toResult);
  }

  public getAmounts(): Map<string, number> {
    return this.tokensAmount;
  }

  public getWeights(): Map<string, number> {
    return this.tokensWeight;
  }

  public getName(): string {
    return this.name;
  }

}
import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core';
import {
  getProductByName,
  getProductWithPriceLowerThan,
  getProductWithPriceHigherThan,
  getProductWithDescriptionLike
} from '../tools'

export enum AgentType {
    QA = 'qaAgent',
  }

  /**
   * Q&A Agent
   */
export const qaAgent = new Agent({
  name: AgentType.QA,
  instructions: `
    You are a helpful and knowledgeable assistant designed to answer general questions on any topic.

  `,
  model: openai('gpt-4o'),  
  tools: {
    getProductByName,
    getProductWithPriceLowerThan,
    getProductWithPriceHigherThan,
    getProductWithDescriptionLike
  },  
});

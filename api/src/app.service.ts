import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mastra } from './mastra';
import { AgentType } from './mastra/agents';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  async getStreamingAgent(question: string): Promise<Observable<{ data: { content: string } }>> {
    const agent = mastra.getAgent(AgentType.QA);
 
    const result = await agent.stream(question);

    return new Observable(subscriber => {
      (async () => {
        try {
          for await (const part of result.fullStream) {
            switch (part.type) {
              case 'error':
                console.error(part.error);
                subscriber.error(part.error);
                break;
              case 'text-delta':
                subscriber.next({ data: { content: part.textDelta } });
                break;
              case 'tool-call':
                console.log(`Calling tool ${part.toolName} with args:`, part.args);
                break;
              case 'tool-result':
                console.log(`Tool result:`, part.result);
                break;
            }
          }
          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
}
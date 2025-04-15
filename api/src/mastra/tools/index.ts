import { PrismaClient } from '@prisma/client';
import { createTool } from '@mastra/core';
import { z } from 'zod';

const prisma = new PrismaClient();

export const getProductByName = createTool({
  id: 'get-product-by-name',
  description: 'Get product details by name/title',
  inputSchema: z.object({
    name: z.string()
  }),
  execute: async ({ context }) => {
    return await prisma.product.findFirst({
      where: {
        title: context.name as string
      }
    });
  },
});


export const getProductWithPriceLowerThan = createTool({
  id: 'get-product-with-price-lower-than',
  description: 'Get product details by name/title',
  inputSchema: z.object({
    price: z.number()
  }),
  execute: async ({ context }) => {
    return await prisma.product.findMany({
      where: {
        price: { lt: context.price }
      }
    });
  }
});


export const getProductWithPriceHigherThan = createTool({
  id: 'get-product-with-price-higher-than',
  description: 'Get product details by name/title',
  inputSchema: z.object({
    price: z.number()
  }),
  execute: async ({ context }) => {
    return await prisma.product.findMany({
      where: {
        price: { gt: context.price }
      }
    });
  }
});

export const getProductWithDescriptionLike = createTool({
  id: 'get-product-with-description-like',
  description: 'Get product details by name/title',
  inputSchema: z.object({
    description: z.string()
  }),
  execute: async ({ context }) => {
    return await prisma.product.findMany({
      where: {
        description: { contains: context.description }
      }
    });
  }
});
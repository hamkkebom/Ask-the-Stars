type MockFactory = () => jest.Mock;

export const createPrismaMock = (mockFn: MockFactory) => ({
  user: {
    findUnique: mockFn(),
    create: mockFn(),
    update: mockFn(),
    findMany: mockFn(),
    findFirst: mockFn(),
  },
  project: {
    findUnique: mockFn(),
    findMany: mockFn(),
    create: mockFn(),
    update: mockFn(),
    delete: mockFn(),
    count: mockFn(),
  },
  projectRequest: {
    create: mockFn(),
    findMany: mockFn(),
    findUnique: mockFn(),
    update: mockFn(),
  },
  projectAssignment: {
    findMany: mockFn(),
    findUnique: mockFn(),
    create: mockFn(),
  },
  submission: {
    findUnique: mockFn(),
  },
  feedback: {
    findMany: mockFn(),
    findUnique: mockFn(),
    create: mockFn(),
    update: mockFn(),
    delete: mockFn(),
  },
  settlement: {
    findMany: mockFn(),
    findUnique: mockFn(),
    create: mockFn(),
    update: mockFn(),
  },
  video: {
    findUnique: mockFn(),
    findMany: mockFn(),
    count: mockFn(),
    update: mockFn(),
  },
  videoTechnicalSpec: {
    findFirst: mockFn(),
    findMany: mockFn(),
    findUnique: mockFn(),
    update: mockFn(),
  },
  category: {
    upsert: mockFn(),
  },
  counselor: {
    findFirst: mockFn(),
    create: mockFn(),
  },
  $transaction: mockFn(),
});

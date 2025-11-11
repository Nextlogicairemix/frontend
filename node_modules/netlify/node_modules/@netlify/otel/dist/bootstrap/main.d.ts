import { SpanProcessor } from '@opentelemetry/sdk-trace-node';
import { Instrumentation } from '@opentelemetry/instrumentation';

interface TracerProviderOptions {
    serviceName: string;
    serviceVersion: string;
    deploymentEnvironment: string;
    siteUrl: string;
    siteId: string;
    siteName: string;
    instrumentations?: (Instrumentation | Promise<Instrumentation>)[];
    spanProcessors?: (SpanProcessor | Promise<SpanProcessor>)[];
}
declare const createTracerProvider: (options: TracerProviderOptions) => Promise<void>;
declare const getBaseSpanProcessor: () => Promise<SpanProcessor>;

export { type TracerProviderOptions, createTracerProvider, getBaseSpanProcessor };

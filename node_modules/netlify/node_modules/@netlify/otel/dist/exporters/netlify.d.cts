import { ExportResult } from '@opentelemetry/core';
import { SpanExporter, ReadableSpan } from '@opentelemetry/sdk-trace-node';

declare class NetlifySpanExporter implements SpanExporter {
    #private;
    constructor();
    /** Export spans. */
    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void;
    /**
     * Shutdown the exporter.
     */
    shutdown(): Promise<void>;
}

export { NetlifySpanExporter };

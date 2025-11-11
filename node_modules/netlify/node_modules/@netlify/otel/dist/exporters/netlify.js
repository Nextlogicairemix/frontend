var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/exporters/netlify.ts
import { diag } from "@opentelemetry/api";
import { BindOnceFuture, ExportResultCode } from "@opentelemetry/core";
import { JsonTraceSerializer } from "@opentelemetry/otlp-transformer";

// src/constants.ts
var TRACE_PREFIX = "__nfOTLPTrace";

// src/exporters/netlify.ts
var _shutdownOnce, _logger, _decoder, _NetlifySpanExporter_instances, shutdown_fn;
var _NetlifySpanExporter = class _NetlifySpanExporter {
  constructor() {
    __privateAdd(this, _NetlifySpanExporter_instances);
    __privateAdd(this, _shutdownOnce);
    __privateAdd(this, _logger);
    __privateSet(this, _shutdownOnce, new BindOnceFuture(__privateMethod(this, _NetlifySpanExporter_instances, shutdown_fn), this));
    __privateSet(this, _logger, diag.createComponentLogger({
      namespace: "netlify-span-exporter"
    }));
  }
  /** Export spans. */
  export(spans, resultCallback) {
    __privateGet(this, _logger).debug(`export ${spans.length.toString()} spans`);
    if (__privateGet(this, _shutdownOnce).isCalled) {
      resultCallback({
        code: ExportResultCode.FAILED,
        error: new Error("Exporter has been shutdown")
      });
      return;
    }
    console.log(TRACE_PREFIX, __privateGet(_NetlifySpanExporter, _decoder).decode(JsonTraceSerializer.serializeRequest(spans)));
    resultCallback({ code: ExportResultCode.SUCCESS });
  }
  /**
   * Shutdown the exporter.
   */
  shutdown() {
    return __privateGet(this, _shutdownOnce).call();
  }
};
_shutdownOnce = new WeakMap();
_logger = new WeakMap();
_decoder = new WeakMap();
_NetlifySpanExporter_instances = new WeakSet();
/**
 * Called by #shutdownOnce with BindOnceFuture
 */
shutdown_fn = function() {
  __privateGet(this, _logger).debug("Shutting down");
  return Promise.resolve();
};
__privateAdd(_NetlifySpanExporter, _decoder, new TextDecoder());
var NetlifySpanExporter = _NetlifySpanExporter;
export {
  NetlifySpanExporter
};

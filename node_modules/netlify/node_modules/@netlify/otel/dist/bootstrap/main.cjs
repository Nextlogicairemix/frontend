"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/constants.ts
var GET_TRACER, SHUTDOWN_TRACERS, TRACE_PREFIX;
var init_constants = __esm({
  "src/constants.ts"() {
    "use strict";
    GET_TRACER = "__netlify__getTracer";
    SHUTDOWN_TRACERS = "__netlify__shutdownTracers";
    TRACE_PREFIX = "__nfOTLPTrace";
  }
});

// package.json
var package_exports = {};
__export(package_exports, {
  default: () => package_default
});
var package_default;
var init_package = __esm({
  "package.json"() {
    package_default = {
      name: "@netlify/otel",
      version: "4.3.2",
      type: "module",
      engines: {
        node: "^18.14.0 || >=20.6.1"
      },
      main: "./dist/main.cjs",
      module: "./dist/main.js",
      types: "./dist/main.d.ts",
      exports: {
        ".": {
          require: {
            types: "./dist/main.d.cts",
            default: "./dist/main.cjs"
          },
          import: {
            types: "./dist/main.d.ts",
            default: "./dist/main.js"
          },
          default: {
            types: "./dist/main.d.ts",
            default: "./dist/main.js"
          }
        },
        "./package.json": "./package.json",
        "./bootstrap": {
          require: {
            types: "./dist/bootstrap/main.d.cts",
            default: "./dist/bootstrap/main.cjs"
          },
          import: {
            types: "./dist/bootstrap/main.d.ts",
            default: "./dist/bootstrap/main.js"
          },
          default: {
            types: "./dist/bootstrap/main.d.ts",
            default: "./dist/bootstrap/main.js"
          }
        },
        "./exporter-netlify": {
          require: {
            types: "./dist/exporters/netlify.d.cts",
            default: "./dist/exporters/netlify.cjs"
          },
          import: {
            types: "./dist/exporters/netlify.d.ts",
            default: "./dist/exporters/netlify.js"
          },
          default: {
            types: "./dist/exporters/netlify.d.ts",
            default: "./dist/exporters/netlify.js"
          }
        },
        "./instrumentation-fetch": {
          require: {
            types: "./dist/instrumentations/fetch.d.cts",
            default: "./dist/instrumentations/fetch.cjs"
          },
          import: {
            types: "./dist/instrumentations/fetch.d.ts",
            default: "./dist/instrumentations/fetch.js"
          },
          default: {
            types: "./dist/instrumentations/fetch.d.ts",
            default: "./dist/instrumentations/fetch.js"
          }
        },
        "./opentelemetry": {
          require: {
            types: "./dist/opentelemetry.d.cts",
            default: "./dist/opentelemetry.cjs"
          },
          import: {
            types: "./dist/opentelemetry.d.ts",
            default: "./dist/opentelemetry.js"
          },
          default: {
            types: "./dist/opentelemetry.d.ts",
            default: "./dist/opentelemetry.js"
          }
        }
      },
      files: [
        "dist/**/*"
      ],
      scripts: {
        build: "tsup-node",
        dev: "tsup-node --watch",
        prepack: "npm run build",
        test: "run-s build test:ci",
        "test:dev": "run-s build test:dev:*",
        "test:ci": "run-s build test:ci:*",
        "test:dev:vitest": "vitest",
        "test:dev:vitest:watch": "vitest watch",
        "test:ci:vitest": "vitest run",
        publint: "npx -y publint --strict"
      },
      keywords: [
        "netlify",
        "cdn"
      ],
      license: "MIT",
      repository: "netlify/primitives",
      bugs: {
        url: "https://github.com/netlify/primitives/issues"
      },
      author: "Netlify Inc.",
      devDependencies: {
        msw: "^2.10.5",
        "npm-run-all2": "^7.0.2",
        tsup: "^8.0.0",
        vitest: "^3.0.0"
      },
      dependencies: {
        "@opentelemetry/api": "1.9.0",
        "@opentelemetry/core": "1.30.1",
        "@opentelemetry/instrumentation": "^0.203.0",
        "@opentelemetry/otlp-transformer": "0.57.2",
        "@opentelemetry/resources": "1.30.1",
        "@opentelemetry/sdk-trace-node": "1.30.1"
      }
    };
  }
});

// src/exporters/netlify.ts
var netlify_exports = {};
__export(netlify_exports, {
  NetlifySpanExporter: () => NetlifySpanExporter
});
var import_api, import_core, import_otlp_transformer, _shutdownOnce, _logger, _decoder, _NetlifySpanExporter_instances, shutdown_fn, _NetlifySpanExporter, NetlifySpanExporter;
var init_netlify = __esm({
  "src/exporters/netlify.ts"() {
    "use strict";
    import_api = require("@opentelemetry/api");
    import_core = require("@opentelemetry/core");
    import_otlp_transformer = require("@opentelemetry/otlp-transformer");
    init_constants();
    _NetlifySpanExporter = class _NetlifySpanExporter {
      constructor() {
        __privateAdd(this, _NetlifySpanExporter_instances);
        __privateAdd(this, _shutdownOnce);
        __privateAdd(this, _logger);
        __privateSet(this, _shutdownOnce, new import_core.BindOnceFuture(__privateMethod(this, _NetlifySpanExporter_instances, shutdown_fn), this));
        __privateSet(this, _logger, import_api.diag.createComponentLogger({
          namespace: "netlify-span-exporter"
        }));
      }
      /** Export spans. */
      export(spans, resultCallback) {
        __privateGet(this, _logger).debug(`export ${spans.length.toString()} spans`);
        if (__privateGet(this, _shutdownOnce).isCalled) {
          resultCallback({
            code: import_core.ExportResultCode.FAILED,
            error: new Error("Exporter has been shutdown")
          });
          return;
        }
        console.log(TRACE_PREFIX, __privateGet(_NetlifySpanExporter, _decoder).decode(import_otlp_transformer.JsonTraceSerializer.serializeRequest(spans)));
        resultCallback({ code: import_core.ExportResultCode.SUCCESS });
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
    NetlifySpanExporter = _NetlifySpanExporter;
  }
});

// src/bootstrap/main.ts
var main_exports = {};
__export(main_exports, {
  createTracerProvider: () => createTracerProvider,
  getBaseSpanProcessor: () => getBaseSpanProcessor
});
module.exports = __toCommonJS(main_exports);
init_constants();
var createTracerProvider = async (options) => {
  const { version: nodeVersion } = await import("process");
  const runtimeVersion = nodeVersion.slice(1);
  const { W3CTraceContextPropagator } = await import("@opentelemetry/core");
  const { Resource } = await import("@opentelemetry/resources");
  const { NodeTracerProvider } = await import("@opentelemetry/sdk-trace-node");
  const { registerInstrumentations } = await import("@opentelemetry/instrumentation");
  const resource = new Resource({
    "service.name": options.serviceName,
    "service.version": options.serviceVersion,
    "process.runtime.name": "nodejs",
    "process.runtime.version": runtimeVersion,
    "deployment.environment": options.deploymentEnvironment,
    "http.url": options.siteUrl,
    "netlify.site.id": options.siteId,
    "netlify.site.name": options.siteName
  });
  const spanProcessors = await Promise.all(options.spanProcessors ?? [await getBaseSpanProcessor()]);
  const nodeTracerProvider = new NodeTracerProvider({
    resource,
    spanProcessors
  });
  nodeTracerProvider.register({
    propagator: new W3CTraceContextPropagator()
  });
  const instrumentations = await Promise.all(options.instrumentations ?? []);
  registerInstrumentations({
    instrumentations,
    tracerProvider: nodeTracerProvider
  });
  const { trace } = await import("@opentelemetry/api");
  const { SugaredTracer } = await import("@opentelemetry/api/experimental");
  const { default: pkg } = await Promise.resolve().then(() => (init_package(), package_exports));
  Object.defineProperty(globalThis, GET_TRACER, {
    enumerable: false,
    configurable: true,
    writable: false,
    value: function getTracer(name, version) {
      if (name) {
        return new SugaredTracer(trace.getTracer(name, version));
      }
      return new SugaredTracer(trace.getTracer(pkg.name, pkg.version));
    }
  });
  Object.defineProperty(globalThis, SHUTDOWN_TRACERS, {
    enumerable: false,
    configurable: true,
    writable: false,
    value: async () => {
      return await nodeTracerProvider.shutdown();
    }
  });
};
var getBaseSpanProcessor = async () => {
  const { SimpleSpanProcessor } = await import("@opentelemetry/sdk-trace-node");
  const { NetlifySpanExporter: NetlifySpanExporter2 } = await Promise.resolve().then(() => (init_netlify(), netlify_exports));
  return new SimpleSpanProcessor(new NetlifySpanExporter2());
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTracerProvider,
  getBaseSpanProcessor
});

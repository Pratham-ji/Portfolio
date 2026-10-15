import React, { useState, useEffect } from 'react';
import styles from '../EngineeringHub.module.css';
import { 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Radio, 
  Workflow, 
  ShieldCheck, 
  Boxes, 
  Zap, 
  Clock, 
  Activity,
  GitBranch,
  Terminal,
  RotateCw,
  Sparkles,
  ArrowDown
} from 'lucide-react';

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  protocol: string;
  isMasterBroker?: boolean;
  latency: string;
  throughput: string;
  techStack: string[];
  metrics: {
    p99: string;
    throughput: string;
    efficiency: string;
    errorRate: string;
  };
  designDecisions: string;
  tradeoffs: string;
  failureMitigations: string;
}

export interface FlagshipSystem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  nodes: ArchitectureNode[];
}

export const FLAGSHIP_SYSTEMS: FlagshipSystem[] = [
  {
    id: 'queue',
    name: 'Queue (Fund My Crazy 2026)',
    subtitle: 'High-Throughput Distributed FIFO & Fair-Queueing Broker',
    description: 'Mission-critical viral crowdfunding queue handling 50k+ burst requests/sec with monotonic token positions and sub-15ms client sync.',
    nodes: [
      {
        id: 'queue-client',
        name: 'Client App (PWA/Mobile)',
        role: 'Ingress & Realtime Position Polling',
        protocol: 'WSS / HTTP/3',
        latency: 'P99: 12ms',
        throughput: '120k active sessions',
        techStack: ['React 19', 'Workbox PWA', 'WebSockets', 'Tailwind CSS'],
        metrics: {
          p99: '12ms',
          throughput: '120k sessions',
          efficiency: '99.4% connection retention',
          errorRate: '<0.01%'
        },
        designDecisions: 'Optimistic queue token issuance with server-side validation to eliminate UI perceptibility of queue lag.',
        tradeoffs: 'Client maintains active socket session; battery consumption managed with adaptive heartbeat throttling when tab is backgrounded.',
        failureMitigations: 'Automatic exponential backoff with randomized jitter on WebSocket dropouts to avoid thundering-herd reconnect storms.'
      },
      {
        id: 'queue-edge',
        name: 'Edge CDN & Request Shaper',
        role: 'Anycast Ingress & DDoS Mitigation',
        protocol: 'Anycast / QUIC',
        latency: 'P99: 6ms',
        throughput: '180k req/s',
        techStack: ['Cloudflare Workers', 'V8 Isolates', 'Edge KV', 'BGP Anycast'],
        metrics: {
          p99: '6ms',
          throughput: '180k req/s',
          efficiency: '94.2% Cache Hit',
          errorRate: '0.000%'
        },
        designDecisions: 'Executed cryptographic token validation directly at edge worker isolates before touching origin compute.',
        tradeoffs: 'Edge KV eventual consistency requires a centralized master broker for final ticket issuance.',
        failureMitigations: 'Sliding-window token bucket algorithm with instant fail-open circuit breaker on upstream gateway saturation.'
      },
      {
        id: 'queue-broker',
        name: 'Distributed WebSocket Broker',
        role: 'Master Architecture Broker & Fanout Engine',
        protocol: 'Binary Protobuf / TCP',
        isMasterBroker: true, // 5% Pratham Red accent
        latency: 'P99: 4.2ms',
        throughput: '85k msgs/sec per core',
        techStack: ['Go / Gorilla', 'Protobuf v3', 'epoll / kqueue', 'Zero-Copy IO'],
        metrics: {
          p99: '4.2ms',
          throughput: '85k msgs/s/core',
          efficiency: '68% wire payload reduction',
          errorRate: '<0.001%'
        },
        designDecisions: 'Engineered binary serialized Protobuf wire protocol over raw WebSocket frames to slash JSON serialization overhead by 68%.',
        tradeoffs: 'Strict protocol versioning required on client apps; handled with backward-compatible Protobuf schema evolution.',
        failureMitigations: 'Raft-consensus leader election across broker cluster nodes ensuring sub-100ms failover without socket teardown.'
      },
      {
        id: 'queue-redis',
        name: 'Redis Geo-Cluster',
        role: 'In-Memory Ring Buffer & Priority Queue',
        protocol: 'RESP3 / TCP',
        latency: 'P99: 1.1ms',
        throughput: '240k ops/sec',
        techStack: ['Redis 7.2', 'Redis Cluster', 'Lua Scripts', 'AOF fsync'],
        metrics: {
          p99: '1.1ms',
          throughput: '240k ops/sec',
          efficiency: '99.9% Memory Efficiency',
          errorRate: '0.000%'
        },
        designDecisions: 'Employed Redis Sorted Sets (ZADD, ZRANK) for deterministic O(log N) positioning with atomic Lua ticket reservation.',
        tradeoffs: 'High in-memory footprint; mitigated by 15-minute TTL eviction on abandoned queue tickets and Redis memory defragmentation.',
        failureMitigations: 'Multi-AZ Redis master-replica pairs with active sentinel failover; persistence backed by AOF 1-second fsync intervals.'
      },
      {
        id: 'queue-supabase',
        name: 'Supabase DB & CDC Engine',
        role: 'Durable Ledger & Change Data Capture',
        protocol: 'Postgres WAL / CDC',
        latency: 'P99: 14ms',
        throughput: '12k write IOPS',
        techStack: ['PostgreSQL 16', 'Supabase Realtime', 'pg_wal2json', 'Logical Replication'],
        metrics: {
          p99: '14ms',
          throughput: '12k write IOPS',
          efficiency: '100% ACID Durability',
          errorRate: '0.000%'
        },
        designDecisions: 'Decoupled persistent transaction audit logging from live queue telemetry using Postgres Logical Replication WAL streaming.',
        tradeoffs: 'Introduces a sub-18ms replication lag between WAL commit and subscriber CDC event emission.',
        failureMitigations: 'Strict idempotent consumer workers with monotonic sequence IDs preventing duplicate allocation entries.'
      }
    ]
  },
  {
    id: 'edtech-rag',
    name: 'B2B EdTech RAG + AR',
    subtitle: 'Zero-Latency Multimodal Retrieval Augmented Generation & WebXR',
    description: 'Enterprise educational spatial computing engine linking 3D WebXR interaction models with vector-augmented semantic synthesis.',
    nodes: [
      {
        id: 'rag-ar-view',
        name: 'Student AR View (Expo/Three.js)',
        role: '6-DoF Spatial Tracking & Viewport Anchor',
        protocol: 'WebXR / WebGL',
        latency: 'Frame: 16.6ms (60 FPS)',
        throughput: 'Sub-millimeter tracking',
        techStack: ['Expo', 'Three.js', 'WebXR Device API', 'GLTF Draco'],
        metrics: {
          p99: '16.6ms frame',
          throughput: '60 FPS stable',
          efficiency: '42MB VRAM baseline',
          errorRate: '0.00%'
        },
        designDecisions: 'Draco-compressed GLTF assets streaming progressively based on student gaze proximity in 3D scene.',
        tradeoffs: 'Initial 3MB shader bundle download on first launch; cached aggressively in IndexedDB for subsequent visits.',
        failureMitigations: 'Graceful fallback to 2.5D orthographic interaction plane if mobile hardware lacks WebXR spatial sensor arrays.'
      },
      {
        id: 'rag-gateway',
        name: 'Institutional API Gateway',
        role: 'Multi-Tenant Auth & Token Rate Limiter',
        protocol: 'gRPC-Web / HTTP/2',
        latency: 'P99: 8ms',
        throughput: '35k req/s',
        techStack: ['Kong Gateway', 'OpenID Connect', 'Envoy Proxy', 'JWT'],
        metrics: {
          p99: '8ms',
          throughput: '35k req/s',
          efficiency: '0.8ms Auth Verification',
          errorRate: '<0.005%'
        },
        designDecisions: 'Decentralized JWT validation at gateway boundary eliminating roundtrips to the primary authentication database.',
        tradeoffs: 'Token revocation propagation delay up to 60 seconds; mitigated with Bloom filter revocation broadcast.',
        failureMitigations: 'Leaky bucket rate limiting per school campus IP preventing classroom synchronization sweeps from triggering 429 errors.'
      },
      {
        id: 'rag-engine',
        name: 'Hybrid RAG Engine (Vector DB + Dense BM25)',
        role: 'Master Knowledge Broker & Hybrid Retrieval',
        protocol: 'HNSW Cosine + BM25',
        isMasterBroker: true, // 5% Pratham Red accent
        latency: 'P99: 28ms',
        throughput: '4.8k queries/sec',
        techStack: ['pgvector', 'Okapi BM25', 'Reciprocal Rank Fusion', 'Cross-Encoder'],
        metrics: {
          p99: '28ms',
          throughput: '4.8k queries/s',
          efficiency: '94.6% Recall@10',
          errorRate: '<0.01%'
        },
        designDecisions: 'Merged dense vector similarity with sparse BM25 lexical search via Reciprocal Rank Fusion (RRF) to eliminate semantic hallucinations in academic curricula.',
        tradeoffs: 'Dual-index maintenance increases ingestion indexing compute by 35%.',
        failureMitigations: 'Dual-path fallback: instantaneous automatic fallback to BM25 if the vector indexing cluster experiences memory pressure.'
      },
      {
        id: 'rag-llm',
        name: 'LLM Triage & Token Budgeter',
        role: 'Streaming Semantic Ranker & Adaptive Synthesis',
        protocol: 'SSE Streaming / Tokens',
        latency: 'TTFT: 140ms',
        throughput: '84 tokens/sec',
        techStack: ['vLLM', 'Llama 3 8B Quantized', 'AWQ 4-Bit', 'Triton Server'],
        metrics: {
          p99: '140ms TTFT',
          throughput: '84 tokens/sec',
          efficiency: '60% VRAM reduction',
          errorRate: '<0.05%'
        },
        designDecisions: 'Deployed 4-bit AWQ quantized models with speculative decoding, slashing GPU memory consumption from 16GB to 5.8GB without measurable BLEU degradation.',
        tradeoffs: 'Slightly higher latency on edge-case multi-step mathematical proofs; routed to heavier FP16 model when complexity score exceeds 0.85.',
        failureMitigations: 'Dynamic context-window truncation and semantic summary cache preventing token context budget overflows.'
      },
      {
        id: 'rag-supabase',
        name: 'Supabase Multi-Tenant Store',
        role: 'Row-Level Security & Spatial Telemetry',
        protocol: 'PostgreSQL / PostGIS',
        latency: 'P99: 9ms',
        throughput: '18k read IOPS',
        techStack: ['Supabase Enterprise', 'PostGIS', 'RLS Policies', 'Vault'],
        metrics: {
          p99: '9ms',
          throughput: '18k IOPS',
          efficiency: '100% Tenant Isolation',
          errorRate: '0.000%'
        },
        designDecisions: 'Enforced institutional boundary security at database layer with PostgreSQL Row Level Security (RLS) policies conditioned on JWT tenant claims.',
        tradeoffs: 'Complex RLS joins require targeted composite indexes to avoid sequential scan penalties on large spatial tables.',
        failureMitigations: 'Continuous WAL archiving with automated point-in-time recovery (PITR) guaranteeing zero student assignment data loss.'
      }
    ]
  },
  {
    id: 'inventory-flow',
    name: 'inventory-flow (Supabase RPC)',
    subtitle: 'High-Concurrency Pessimistic Inventory Lock & Atomic Allocation',
    description: 'Flash-sale inventory reservation engine preventing overselling under 15,000 simultaneous checkouts per SKU using Postgres row locks.',
    nodes: [
      {
        id: 'inv-client',
        name: 'React Client (60fps Spring Count-up)',
        role: 'Optimistic Stock Counter & Dynamic UI',
        protocol: 'HTTPS / WebSocket',
        latency: 'Render: 16ms (60 FPS)',
        throughput: 'Zero dropped frames',
        techStack: ['React 19', 'Framer Motion', 'Zustand', 'CSS Houdini'],
        metrics: {
          p99: '16ms frame',
          throughput: '60 FPS Count-up',
          efficiency: 'Zero layout thrash',
          errorRate: '0.00%'
        },
        designDecisions: 'Employed physics-based spring counters for live stock decrements, giving instantaneous tactile visual feedback.',
        tradeoffs: 'Requires rollback state machine in the event of upstream inventory exhaustion during checkout submit.',
        failureMitigations: 'Reconciliation queue that smoothly animates stock count back to confirmed state on 409 Conflict rejection.'
      },
      {
        id: 'inv-edge',
        name: 'Supabase Edge Function',
        role: 'Idempotency Key Verification & Pre-flight Guard',
        protocol: 'HTTP/2 REST',
        latency: 'P99: 18ms',
        throughput: '22k req/s',
        techStack: ['Deno Runtime', 'TypeScript', 'WebCrypto API', 'Upstash Redis'],
        metrics: {
          p99: '18ms',
          throughput: '22k req/s',
          efficiency: '<25ms Cold Start',
          errorRate: '<0.001%'
        },
        designDecisions: 'Verified cryptographic idempotency key in ultra-low latency edge cache to stop double-spend card charges at network ingress.',
        tradeoffs: 'Additional network hop before Postgres invocation; compensated by geo-locating edge functions adjacent to primary database region.',
        failureMitigations: 'Stateless edge workers automatically scale up to thousands of concurrent isolates during traffic spikes.'
      },
      {
        id: 'inv-rpc',
        name: 'ACID RPC Transaction (Row-Locking)',
        role: 'Master Concurrency Engine & Strict Serializability',
        protocol: 'PL/pgSQL / Postgres RPC',
        isMasterBroker: true, // 5% Pratham Red accent
        latency: 'P99: 4.8ms',
        throughput: '15,000 tx/sec',
        techStack: ['PostgreSQL 16', 'FOR UPDATE NOWAIT', 'PL/pgSQL', 'Advisory Locks'],
        metrics: {
          p99: '4.8ms',
          throughput: '15,000 tx/s',
          efficiency: '0 Oversell Violations',
          errorRate: '0.000%'
        },
        designDecisions: 'Implemented `SELECT stock FROM skus WHERE id = sku_id FOR UPDATE NOWAIT` inside an atomic Postgres stored procedure, failing fast rather than locking worker threads.',
        tradeoffs: 'High lock contention during 1-second drops yields fast 409 rejections; mitigated with virtual queue buffer.',
        failureMitigations: 'Ordered resource lock acquisition guarantees mathematical impossibility of database deadlock conditions.'
      },
      {
        id: 'inv-bus',
        name: 'Realtime Event Bus',
        role: 'Broadcast Engine & Cross-Client Sync',
        protocol: 'LISTEN/NOTIFY -> WSS',
        latency: 'P99: 16ms',
        throughput: '50k concurrent listeners',
        techStack: ['Supabase Realtime', 'Phoenix Channels', 'Elixir BEAM', 'WebSockets'],
        metrics: {
          p99: '16ms',
          throughput: '50k listeners',
          efficiency: '100% Broadcast Delivery',
          errorRate: '<0.002%'
        },
        designDecisions: 'Tied database row commit triggers directly to Elixir BEAM Phoenix Channels to push decrement updates to all connected browser windows instantly.',
        tradeoffs: 'High concurrent WebSocket connections on broker; distributed across load-balanced BEAM nodes.',
        failureMitigations: 'Monotonic sequence numbers in broadcast payloads allow clients to identify and request missing messages on connection blips.'
      }
    ]
  },
  {
    id: 'project-loop',
    name: 'Project LOOP',
    subtitle: 'Asynchronous Natural Language Clustering & Auto-Triage Pipeline',
    description: 'Multi-source customer intelligence platform parsing thousands of unstructured bug reports, clustering semantic intent, and dispatching prioritized Jira/GitHub tickets.',
    nodes: [
      {
        id: 'loop-ingest',
        name: 'Customer Feedback Ingest',
        role: 'Multi-Channel Webhook Ingestion & Sanitization',
        protocol: 'HTTP/3 Webhooks',
        latency: 'P99: 5.5ms',
        throughput: '12k events/sec',
        techStack: ['Fastify', 'Zod Validation', 'DOMPurify', 'Cloudflare Access'],
        metrics: {
          p99: '5.5ms',
          throughput: '12k events/s',
          efficiency: '99.995% Uptime',
          errorRate: '<0.001%'
        },
        designDecisions: 'Responded immediately with HTTP 202 Accepted after hashing payloads, buffering directly into distributed queue to never hold open third-party webhooks.',
        tradeoffs: 'Client webhook sender receives asynchronous acknowledgement before sentiment extraction completes.',
        failureMitigations: 'Dead-letter exchange (DLX) for corrupted JSON schemas with automatic engineering on-call alerts.'
      },
      {
        id: 'loop-queue',
        name: 'Async Queue & Worker Dispatcher',
        role: 'Master Pipeline Dispatcher & Priority Scheduler',
        protocol: 'BullMQ / Redis Stream',
        isMasterBroker: true, // 5% Pratham Red accent
        latency: 'P99: 2.3ms',
        throughput: '1.2M jobs in flight',
        techStack: ['BullMQ', 'Redis Streams', 'Node.js Worker Threads', 'Cluster Mode'],
        metrics: {
          p99: '2.3ms',
          throughput: '1.2M capacity',
          efficiency: '64 Concurrent Threads',
          errorRate: '0.000%'
        },
        designDecisions: 'Architected priority queues that prioritize enterprise severity-1 production outages over routine feedback surveys.',
        tradeoffs: 'Requires continuous worker health heartbeat monitoring to detect stalled child processes.',
        failureMitigations: 'Built-in stalled job watchdog re-enqueues orphaned tasks if a compute node runs out of memory during embedding generation.'
      },
      {
        id: 'loop-tokenizer',
        name: 'Sentiment Tokenizer & Vectorizer',
        role: 'BPE Tokenizer & Intent Classification',
        protocol: 'gRPC / Shared Memory',
        latency: 'P99: 12ms',
        throughput: '8.5k docs/sec',
        techStack: ['HuggingFace Tokenizers (Rust)', 'MiniLM-L6-v2', 'ONNX Runtime', 'AVX-512'],
        metrics: {
          p99: '12ms',
          throughput: '8.5k docs/s',
          efficiency: '384-Dim Embeddings',
          errorRate: '<0.01%'
        },
        designDecisions: 'Compiled ONNX Runtime with native CPU AVX-512 vector extensions, achieving GPU-grade embedding speeds without requiring dedicated GPU instances.',
        tradeoffs: 'High CPU core utilization during peak batch ingest spikes.',
        failureMitigations: 'Dynamic mini-batching gathers incoming documents into 64-item batches to maximize SIMD processor pipeline saturation.'
      },
      {
        id: 'loop-cluster',
        name: 'K-Means Clusterer',
        role: 'Dimensionality Reduction & Unsupervised Grouping',
        protocol: 'NumPy / C++ Core',
        latency: 'P99: 45ms per 10k batch',
        throughput: '10k points/batch',
        techStack: ['FAISS', 'MiniBatch K-Means', 'UMAP Projection', 'C++17'],
        metrics: {
          p99: '45ms / 10k batch',
          throughput: '91.2% Cluster Purity',
          efficiency: '0.78 Silhouette Score',
          errorRate: '0.00%'
        },
        designDecisions: 'Adopted MiniBatch K-Means with reservoir sampling, delivering 95% clustering fidelity at 12x less CPU time than classic Lloyd algorithm iterations.',
        tradeoffs: 'Centroids require periodic re-anchoring as language semantics drift over product releases.',
        failureMitigations: 'Automated cluster centroid variance guard: automatically splits any cluster whose standard deviation crosses 1.8 sigma.'
      },
      {
        id: 'loop-triage',
        name: 'Jira/GitHub Auto-Triage',
        role: 'Synthesizer & Bidirectional Ticket Sync',
        protocol: 'REST / GraphQL',
        latency: 'P99: 220ms',
        throughput: '45 issues/min',
        techStack: ['Octokit', 'Jira REST API v3', 'OAuth 2.0', 'Rate Limiter'],
        metrics: {
          p99: '220ms external',
          throughput: '45 issues/min',
          efficiency: '84% De-duplication',
          errorRate: '<0.02%'
        },
        designDecisions: 'Synthesized related clusters into single parent epics with linked sub-tasks, preventing notification spam and engineering duplicate work.',
        tradeoffs: 'Bound by Atlassian and GitHub external API rate limit quotas.',
        failureMitigations: 'Adaptive token-bucket throttler queuing requests locally during third-party API degradation.'
      }
    ]
  }
];

export const ArchitectureExplorer: React.FC = () => {
  const [selectedSystemId, setSelectedSystemId] = useState<string>('queue');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(FLAGSHIP_SYSTEMS[0].nodes[2].id); // Default to master broker

  const activeSystem = FLAGSHIP_SYSTEMS.find(s => s.id === selectedSystemId) || FLAGSHIP_SYSTEMS[0];
  
  // Keep selected node synced if system changes
  const activeNode = activeSystem.nodes.find(n => n.id === selectedNodeId) || activeSystem.nodes[0];

  const handleSystemChange = (systemId: string) => {
    setSelectedSystemId(systemId);
    const targetSys = FLAGSHIP_SYSTEMS.find(s => s.id === systemId);
    if (targetSys) {
      // Find master broker if available, otherwise first node
      const master = targetSys.nodes.find(n => n.isMasterBroker) || targetSys.nodes[0];
      setSelectedNodeId(master.id);
    }
  };

  useEffect(() => {
    const handleArchSelect = (e: CustomEvent<{ systemId?: string }>) => {
      if (e.detail?.systemId) {
        handleSystemChange(e.detail.systemId);
      }
    };
    window.addEventListener('prathamos:arch-select' as any, handleArchSelect);
    return () => window.removeEventListener('prathamos:arch-select' as any, handleArchSelect);
  }, []);

  return (
    <div className={styles.archExplorerLayout}>
      {/* System Switcher Bar */}
      <div className={styles.systemSwitcherBar}>
        {FLAGSHIP_SYSTEMS.map(sys => {
          const isActive = sys.id === selectedSystemId;
          return (
            <button
              key={sys.id}
              onClick={() => handleSystemChange(sys.id)}
              className={`${styles.systemPillBtn} ${isActive ? styles.systemPillBtnActive : ''}`}
            >
              <Cpu size={14} style={{ color: isActive ? '#0A84FF' : 'inherit' }} />
              {sys.name}
            </button>
          );
        })}
      </div>

      {/* Main Workspace (Canvas + Inspector) */}
      <div className={styles.archWorkspace}>
        {/* Canvas Area */}
        <div className={styles.canvasContainer}>
          <div className={styles.canvasInner}>
            {/* System Overview Header */}
            <div className={styles.systemOverviewHeader}>
              <div>
                <h2 className={styles.systemTitle}>{activeSystem.name}</h2>
                <p className={styles.systemSubtitle}>{activeSystem.subtitle}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={styles.hardwareBadge}>
                  <Sparkles size={11} className={styles.brandRedMark} />
                  PRODUCTION SPEC
                </span>
              </div>
            </div>

            {/* Architecture Node Pipeline Flow */}
            <div className={styles.pipelineVisualizer}>
              {activeSystem.nodes.map((node, index) => {
                const isSelected = node.id === activeNode.id;
                const isMaster = Boolean(node.isMasterBroker);

                let cardClasses = styles.nodeCard;
                if (isMaster) cardClasses += ` ${styles.nodeMasterBroker}`;
                if (isSelected) cardClasses += ` ${styles.nodeSelected}`;

                return (
                  <React.Fragment key={node.id}>
                    <div 
                      className={cardClasses}
                      onClick={() => setSelectedNodeId(node.id)}
                    >
                      <div className={styles.nodeLeft}>
                        <div 
                          className={`${styles.nodeIndex} ${isSelected ? styles.nodeIndexActive : isMaster ? styles.nodeIndexMaster : ''}`}
                        >
                          {index + 1}
                        </div>
                        <div className={styles.nodeInfo}>
                          <div className={styles.nodeName}>
                            {node.name}
                            {isMaster && (
                              <span className={styles.masterPill}>
                                MASTER BROKER
                              </span>
                            )}
                          </div>
                          <div className={styles.nodeRole}>{node.role}</div>
                        </div>
                      </div>

                      <div className={styles.nodeRight}>
                        <span className={styles.protocolBadge}>{node.protocol}</span>
                        <span className={styles.nodeLatency}>{node.latency}</span>
                      </div>
                    </div>

                    {/* Flow Connector Arrow */}
                    {index < activeSystem.nodes.length - 1 && (
                      <div className={styles.flowPathConnector}>
                        <div className={`${styles.flowLine} ${isSelected ? styles.flowLineActive : ''}`}>
                          <div className={styles.flowPacket} />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side / Bottom Inspector Drawer */}
        <div className={styles.inspectorDrawer}>
          <div className={styles.inspectorHeader}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className={styles.sectionHeading}>INSPECTOR TELEMETRY</span>
              {activeNode.isMasterBroker && (
                <span className={styles.masterPill}>
                  CORE HUB
                </span>
              )}
            </div>
            <h3 className={styles.inspectorTitle}>{activeNode.name}</h3>
            <div className={styles.inspectorRole}>{activeNode.role}</div>
          </div>

          <div className={styles.inspectorContent}>
            {/* Tech Stack Pills */}
            <div className={styles.inspectorSection}>
              <span className={styles.sectionHeading}>TECHNOLOGY STACK</span>
              <div className={styles.tagsCloud}>
                {activeNode.techStack.map(tag => (
                  <span key={tag} className={styles.techTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Metrics Bento */}
            <div className={styles.inspectorSection}>
              <span className={styles.sectionHeading}>TELEMETRY BENCHMARKS</span>
              <div className={styles.metricsGrid}>
                <div className={styles.metricTile}>
                  <span className={styles.metricTileLabel}>P99 LATENCY</span>
                  <span className={styles.metricTileValue} style={{ color: '#0A84FF' }}>
                    {activeNode.metrics.p99}
                  </span>
                </div>
                <div className={styles.metricTile}>
                  <span className={styles.metricTileLabel}>THROUGHPUT</span>
                  <span className={styles.metricTileValue} style={{ color: '#30D158' }}>
                    {activeNode.metrics.throughput}
                  </span>
                </div>
                <div className={styles.metricTile}>
                  <span className={styles.metricTileLabel}>EFFICIENCY</span>
                  <span className={styles.metricTileValue} style={{ color: '#FF9F0A' }}>
                    {activeNode.metrics.efficiency}
                  </span>
                </div>
                <div className={styles.metricTile}>
                  <span className={styles.metricTileLabel}>ERROR RATE</span>
                  <span className={styles.metricTileValue} style={{ color: '#BF5AF2' }}>
                    {activeNode.metrics.errorRate}
                  </span>
                </div>
              </div>
            </div>

            {/* Architectural Design Decisions */}
            <div className={styles.inspectorSection}>
              <span className={styles.sectionHeading}>DESIGN DECISION</span>
              <div className={`${styles.calloutCard} ${styles.calloutDecision}`}>
                {activeNode.designDecisions}
              </div>
            </div>

            {/* Tradeoffs Analyzed */}
            <div className={styles.inspectorSection}>
              <span className={styles.sectionHeading}>TRADEOFF ANALYSIS</span>
              <div className={`${styles.calloutCard} ${styles.calloutTradeoff}`}>
                {activeNode.tradeoffs}
              </div>
            </div>

            {/* Failure Mode Mitigations */}
            <div className={styles.inspectorSection}>
              <span className={styles.sectionHeading}>FAILURE MITIGATION</span>
              <div className={`${styles.calloutCard} ${styles.calloutMitigation}`}>
                {activeNode.failureMitigations}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

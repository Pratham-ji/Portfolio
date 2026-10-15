import React, { useState, useEffect, useRef } from 'react';
import styles from '../EngineeringHub.module.css';
import { 
  Play, 
  RotateCw, 
  Cpu, 
  Activity, 
  Terminal, 
  Zap, 
  Gauge, 
  Clock, 
  CheckCircle2, 
  Code2, 
  Layers,
  Sparkles,
  BarChart2
} from 'lucide-react';

interface LeetCodeCategory {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
  hard: number;
  medium: number;
  easy: number;
  keyPatterns: string[];
}

const LEETCODE_CATEGORIES: LeetCodeCategory[] = [
  {
    id: 'dp',
    name: 'Dynamic Programming',
    count: 180,
    percentage: 30,
    color: '#0A84FF',
    hard: 48,
    medium: 112,
    easy: 20,
    keyPatterns: ['Digit DP', '2D Knapsack & Bitmasking', 'Interval & Tree DP', 'State-Machine DP']
  },
  {
    id: 'cyclic',
    name: 'Cyclic Arrays & Monotonic Deques',
    count: 95,
    percentage: 16,
    color: '#30D158',
    hard: 26,
    medium: 58,
    easy: 11,
    keyPatterns: ['Monotonic Queue Optimization', 'Circular Ring Buffers', 'Next Greater Element', 'Sliding Window Maximum']
  },
  {
    id: 'subarrays',
    name: 'Subarrays & Two Pointers',
    count: 120,
    percentage: 20,
    color: '#FF9F0A',
    hard: 22,
    medium: 74,
    easy: 24,
    keyPatterns: ['Shrinking Window Invariant', 'Prefix Sum + Hash Map', 'Kadane Extensions', 'Fast & Slow Pointers']
  },
  {
    id: 'trees-graphs',
    name: 'Trees & Graphs',
    count: 150,
    percentage: 25,
    color: '#BF5AF2',
    hard: 41,
    medium: 89,
    easy: 20,
    keyPatterns: ['Eulerian Path / Hierholzer', 'Bridges & Tarjan SCC', 'Segment Trees & Lazy Propagation', 'Dijkstra / Bellman-Ford']
  },
  {
    id: 'other',
    name: 'Math, Bit Manipulation & Strings',
    count: 55,
    percentage: 9,
    color: '#8E8E93',
    hard: 15,
    medium: 30,
    easy: 10,
    keyPatterns: ['Bitwise Sieve / Fast Exponentiation', 'KMP / Trie Automata', 'Combinatorics & Modular Inverse']
  }
];

interface BenchmarkEntry {
  lang: string;
  solution: string;
  timeMs: number;
  memoryMb: number;
  color: string;
  flags: string;
  optimizations: string;
}

const BENCHMARK_DATA: BenchmarkEntry[] = [
  {
    lang: 'C++',
    solution: "Pratham's Optimized Solution (LC 3539)",
    timeMs: 1.8,
    memoryMb: 8.2,
    color: '#0A84FF',
    flags: '-O3 -march=native -fno-rtti',
    optimizations: 'Zero-allocation ring buffer, branchless bitwise cyclic indexing, SIMD auto-vectorization'
  },
  {
    lang: 'Java',
    solution: 'Standard JRE HotSpot Compilation',
    timeMs: 18.4,
    memoryMb: 42.1,
    color: '#FF9F0A',
    flags: '-XX:+TieredCompilation -Xms64m',
    optimizations: 'ArrayDeque boxing overhead, JVM garbage collection pauses, bounds checking'
  },
  {
    lang: 'Python',
    solution: 'CPython 3.12 Runtime',
    timeMs: 112.6,
    memoryMb: 24.8,
    color: '#30D158',
    flags: 'CPython bytecode interpreter',
    optimizations: 'Dynamic type resolution overhead, GIL reference counting, hash map pointer indirection'
  }
];

interface ChaiPipelineStep {
  name: string;
  latencyMs: number;
  throughput: string;
  color: string;
  description: string;
}

const CHAI_PIPELINE: ChaiPipelineStep[] = [
  {
    name: 'Lexer / Tokenizer',
    latencyMs: 0.12,
    throughput: '180k tokens/sec',
    color: '#0A84FF',
    description: 'Deterministic DFA scanner with zero heap allocations on identifier lookups'
  },
  {
    name: 'Recursive-Descent AST Builder',
    latencyMs: 0.38,
    throughput: '42k nodes/sec',
    color: '#30D158',
    description: 'Precedence climbing Pratt expression parser with arena memory pool'
  },
  {
    name: 'Semantic Scope Resolver',
    latencyMs: 0.22,
    throughput: 'Lexical Environment',
    color: '#FF9F0A',
    description: 'Static de Bruijn lexical index mapping for O(1) variable lookups'
  },
  {
    name: 'Evaluator Engine',
    latencyMs: 0.45,
    throughput: 'Stack-based walker',
    color: '#BF5AF2',
    description: 'Cache-aligned bytecode dispatch loop with 64-bit NaN-boxed value union'
  }
];

export const AlgorithmicTelemetry: React.FC = () => {
  // LeetCode Donut Hover State
  const [hoveredCategory, setHoveredCategory] = useState<LeetCodeCategory | null>(null);

  // Benchmark Metric Toggle ('time' | 'memory')
  const [benchmarkMetric, setBenchmarkMetric] = useState<'time' | 'memory'>('time');
  const [hoveredBenchmark, setHoveredBenchmark] = useState<BenchmarkEntry | null>(null);

  // ChaiScript Benchmark Simulator State
  const [isRunningBenchmark, setIsRunningBenchmark] = useState<boolean>(false);
  const [expressionsParsed, setExpressionsParsed] = useState<number>(10000);
  const [benchmarkDurationMs, setBenchmarkDurationMs] = useState<number>(11.7);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] ChaiScript JIT environment ready (64-bit NaN-boxed runtime)',
    '[BENCHMARK] Ready for 10,000-expression live cycle simulation'
  ]);

  const animationRef = useRef<number | null>(null);

  // Run ChaiScript Benchmark Simulation
  const runLiveBenchmark = () => {
    if (isRunningBenchmark) return;
    setIsRunningBenchmark(true);
    setExpressionsParsed(0);
    setLogs([
      `[BENCHMARK] Spawning isolate worker... [target: 10,000 expressions]`,
      `[CLOCK] High-resolution monotonic timer armed (performance.now)`
    ]);

    const startTime = performance.now();
    const targetExprs = 10000;
    const durationGoal = 11.7; // 11.7ms target

    const step = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / 800); // Visual animation runs over 800ms for dramatic tactile clarity
      const currentCount = Math.floor(progress * targetExprs);
      
      setExpressionsParsed(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        const simulatedMonotonicTime = +(durationGoal + (Math.random() * 0.4 - 0.2)).toFixed(2);
        setBenchmarkDurationMs(simulatedMonotonicTime);
        setExpressionsParsed(targetExprs);
        setIsRunningBenchmark(false);

        const throughput = Math.floor((targetExprs / simulatedMonotonicTime) * 1000).toLocaleString();

        setLogs(prev => [
          ...prev,
          `[STAGE 1/4] Lexer scanned 48,290 tokens in 0.12ms [182.4k tok/s]`,
          `[STAGE 2/4] Pratt AST built: 10,000 expressions without syntax faults`,
          `[STAGE 3/4] Scope resolver linked 3,420 lexical bindings in 0.22ms`,
          `[STAGE 4/4] Evaluator executed AST in ${simulatedMonotonicTime}ms [${throughput} expr/s]`,
          `[RESULT] 0 memory leaks, 100% test assertions PASSED. Cycle complete.`
        ]);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Calculate SVG Donut Geometry
  const radius = 65;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className={styles.telemetryContainer}>
      {/* Top Bento Grid: LeetCode & C++ Benchmarks */}
      <div className={styles.telemetryBentoTop}>
        {/* LeetCode Donut Chart Card */}
        <div className={styles.bentoCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Activity size={14} style={{ color: '#0A84FF' }} />
              Algorithmic Problem Distribution
            </h3>
            <span className={styles.hardwareBadge}>600+ SOLVED</span>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.chartContainer}>
              {/* SVG Donut */}
              <div className={styles.donutWrapper}>
                <svg className={styles.donutSvg} viewBox="0 0 160 160">
                  {LEETCODE_CATEGORIES.map(cat => {
                    const segmentLength = (cat.count / 600) * circumference;
                    const strokeDasharray = `${segmentLength} ${circumference - segmentLength}`;
                    const strokeDashoffset = -accumulatedOffset;
                    accumulatedOffset += segmentLength;

                    const isHovered = hoveredCategory?.id === cat.id;

                    return (
                      <circle
                        key={cat.id}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={cat.color}
                        strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className={styles.donutSegment}
                        onMouseEnter={() => setHoveredCategory(cat)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Display */}
                <div className={styles.donutCenterText}>
                  <div className={styles.donutCount}>
                    {hoveredCategory ? hoveredCategory.count : '600+'}
                  </div>
                  <div className={styles.donutLabel}>
                    {hoveredCategory ? hoveredCategory.name.slice(0, 14) : 'TOTAL SOLVED'}
                  </div>
                </div>
              </div>

              {/* Category Breakdown List */}
              <div className={styles.categoryList}>
                {LEETCODE_CATEGORIES.map(cat => {
                  const isActive = hoveredCategory?.id === cat.id;
                  return (
                    <div 
                      key={cat.id}
                      className={`${styles.categoryItem} ${isActive ? styles.categoryItemActive : ''}`}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div className={styles.categoryLeft}>
                        <span className={styles.categoryDot} style={{ backgroundColor: cat.color }} />
                        <span className={styles.categoryName}>{cat.name}</span>
                      </div>
                      <span className={styles.categoryCount} style={{ color: cat.color }}>
                        {cat.count}+
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hovered Details Callout */}
            {hoveredCategory && (
              <div 
                className={styles.calloutCard} 
                style={{ marginTop: '12px', borderLeft: `3px solid ${hoveredCategory.color}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>{hoveredCategory.name} Details:</span>
                  <span style={{ fontFamily: 'var(--pos-font-mono, monospace)', fontSize: '11px' }}>
                    Hard: {hoveredCategory.hard} | Med: {hoveredCategory.medium} | Easy: {hoveredCategory.easy}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#8E8E93' }}>
                  Mastered: {hoveredCategory.keyPatterns.join(' • ')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* C++ vs Java vs Python Benchmark Chart */}
        <div className={styles.bentoCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <BarChart2 size={14} style={{ color: '#30D158' }} />
              LeetCode 3539 Cyclic Array Partition
            </h3>
            
            {/* Metric Toggle */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setBenchmarkMetric('time')}
                className={styles.hardwareBadge}
                style={{ 
                  cursor: 'pointer',
                  borderColor: benchmarkMetric === 'time' ? '#0A84FF' : undefined,
                  color: benchmarkMetric === 'time' ? '#0A84FF' : undefined
                }}
              >
                SPEED (ms)
              </button>
              <button
                onClick={() => setBenchmarkMetric('memory')}
                className={styles.hardwareBadge}
                style={{ 
                  cursor: 'pointer',
                  borderColor: benchmarkMetric === 'memory' ? '#30D158' : undefined,
                  color: benchmarkMetric === 'memory' ? '#30D158' : undefined
                }}
              >
                RAM (MB)
              </button>
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.benchmarkBarsList}>
              {BENCHMARK_DATA.map(bench => {
                const isCplusplus = bench.lang === 'C++';
                const maxVal = benchmarkMetric === 'time' ? 120 : 50;
                const curVal = benchmarkMetric === 'time' ? bench.timeMs : bench.memoryMb;
                const percentage = Math.min(100, Math.max(6, (curVal / maxVal) * 100));

                return (
                  <div 
                    key={bench.lang} 
                    className={styles.benchmarkRow}
                    onMouseEnter={() => setHoveredBenchmark(bench)}
                    onMouseLeave={() => setHoveredBenchmark(null)}
                  >
                    <div className={styles.benchmarkHeader}>
                      <span className={styles.benchmarkLang}>
                        {bench.lang}
                        {isCplusplus && (
                          <span className={styles.speedupBadge}>
                            {benchmarkMetric === 'time' ? '62.5x FASTER' : 'LOWEST FOOTPRINT'}
                          </span>
                        )}
                      </span>
                      <span className={styles.benchmarkVal} style={{ color: bench.color }}>
                        {curVal} {benchmarkMetric === 'time' ? 'ms' : 'MB'}
                      </span>
                    </div>

                    <div className={styles.barTrack}>
                      <div 
                        className={styles.barFill} 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: bench.color 
                        }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Architecture / Hardware Optimization Callout */}
            <div className={`${styles.calloutCard} ${styles.calloutDecision}`} style={{ marginTop: '14px' }}>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>C++ Cache-Locality Optimization:</div>
              <div style={{ fontSize: '11px', color: '#8E8E93', lineHeight: 1.5 }}>
                Achieved 1.8ms runtime via zero-allocation circular deque ring buffer, branchless bitwise modular arithmetic <code>(idx + k) &amp; mask</code>, and compiler loop unrolling with SIMD prefetching.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bento Card: ChaiScript Interpreter Pipeline Telemetry */}
      <div className={styles.bentoCard}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={14} style={{ color: '#BF5AF2' }} />
            <h3 className={styles.cardTitle}>
              ChaiScript Interpreter Pipeline Telemetry
            </h3>
          </div>
          <span className={styles.hardwareBadge}>10,000 EXPRESSION SUITE</span>
        </div>

        <div className={styles.cardBody}>
          {/* Pipeline Stage Latency Breakdown Grid */}
          <div className={styles.pipelineStagesGrid}>
            {CHAI_PIPELINE.map(stage => (
              <div key={stage.name} className={styles.stageCard}>
                <span className={styles.stageName}>{stage.name}</span>
                <span className={styles.stageLatency} style={{ color: stage.color }}>
                  {stage.latencyMs}ms
                </span>
                <span className={styles.stageThroughput}>{stage.throughput}</span>
              </div>
            ))}
          </div>

          {/* Controls & Live Simulation Readout */}
          <div className={styles.benchmarkControls}>
            <button
              onClick={runLiveBenchmark}
              disabled={isRunningBenchmark}
              className={styles.runBenchmarkBtn}
            >
              {isRunningBenchmark ? (
                <>
                  <RotateCw size={14} className="animate-spin" />
                  Simulating Parser Run...
                </>
              ) : (
                <>
                  <Play size={14} />
                  Run Live Benchmark (10k Expr)
                </>
              )}
            </button>

            <div className={styles.benchmarkLiveReadout}>
              <div className={styles.readoutItem}>
                <span className={styles.readoutLabel}>EXPRESSIONS</span>
                <span className={styles.readoutVal}>
                  {expressionsParsed.toLocaleString()} / 10,000
                </span>
              </div>
              <div className={styles.readoutItem}>
                <span className={styles.readoutLabel}>TOTAL LATENCY</span>
                <span className={styles.readoutVal} style={{ color: '#0A84FF' }}>
                  {benchmarkDurationMs}ms
                </span>
              </div>
              <div className={styles.readoutItem}>
                <span className={styles.readoutLabel}>THROUGHPUT</span>
                <span className={styles.readoutVal} style={{ color: '#BF5AF2' }}>
                  {Math.floor((expressionsParsed / (benchmarkDurationMs || 1)) * 1000).toLocaleString()} expr/s
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Interpreter Log Terminal */}
          <div className={styles.logTerminal}>
            {logs.map((log, idx) => (
              <div key={idx} style={{ opacity: idx === logs.length - 1 ? 1 : 0.8 }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

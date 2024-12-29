import { useState, useEffect } from 'react';
import { RuleResult } from '../types';
import { checklistApi } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [results, setResults] = useState<RuleResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await checklistApi.getResults('67339ae56d5231c1a2c63639');
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Application Checklist Results</h1>
      <div className="results-grid">
        {results.map((result, index) => (
          <div
            key={index + 1}
            className={`result-card ${result.passed ? 'passed' : 'failed'}`}
          >
            <h3>{result.ruleName}</h3>
            <div className="status">
              {result.passed ? '✓ Passed' : '✗ Failed'}
            </div>
            <p>{result.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

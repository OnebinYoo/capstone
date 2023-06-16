import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [securityRules, setSecurityRules] = useState([]);
  const [isRuleApplied, setIsRuleApplied] = useState(false);

  useEffect(() => {
    fetchSecurityRules();
  }, []);

  const fetchSecurityRules = async () => {
    try {
      const response = await axios.get('http://192.168.0.28:8000/security-rules');
      const rules = response.data.security_rules;
      setSecurityRules(rules);
    } catch (error) {
      console.error('Error fetching security rules:', error);
    }
  };

  const toggleRule = async (ruleId, isEnabled) => {
    try {
      const response = await axios.put(`http://192.168.0.28:8000/security-rules/${ruleId}`, { enabled: isEnabled });
      const updatedRule = response.data.rule;
      const updatedRules = securityRules.map((rule) =>
        rule.id === updatedRule.id ? updatedRule : rule
      );
      setSecurityRules(updatedRules);
      setIsRuleApplied(updatedRule.enabled);
    } catch (error) {
      console.error('Error toggling security rule:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Security Rules</h2>
      {console.log(securityRules)}
      {securityRules.map((rule) => (
        <div key={rule.id}>
          <h3>{rule.name}</h3>
          <p>Description: {rule.description}</p>
          <p>Enabled: {rule.enabled ? 'Yes' : 'No'}</p>
          <button onClick={() => toggleRule(rule.id, !rule.enabled)}>
            {rule.enabled ? 'Disable Rule' : 'Enable Rule'}
          </button>
        </div>
      ))}
      <h2>Current Rule Applied: {isRuleApplied ? 'Yes' : 'No'}</h2>
    </div>
  );
}

export default AdminPage;

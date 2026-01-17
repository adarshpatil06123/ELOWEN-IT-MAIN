/**
 * Debug API Screen
 * Use this screen to test and verify backend connectivity
 * Add this to your navigation for easy access during development
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { checkBackendHealth, testAuthEndpoint, runDiagnostics } from '../utils/apiHealthCheck';
import { authAPI } from '../services/api';

const DebugAPIScreen = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const runTest = async (testName, testFunction) => {
    setLoading(true);
    setResults(null);
    
    try {
      const result = await testFunction();
      setResults({
        testName,
        success: true,
        data: result,
      });
    } catch (error) {
      setResults({
        testName,
        success: false,
        error: error.message || 'Test failed',
        data: error,
      });
    } finally {
      setLoading(false);
    }
  };

  const testHealthEndpoint = async () => {
    await runTest('Backend Health Check', checkBackendHealth);
  };

  const testAuthEndpointCheck = async () => {
    await runTest('Auth Endpoint Test', testAuthEndpoint);
  };

  const testFullDiagnostics = async () => {
    await runTest('Full Diagnostics', runDiagnostics);
  };

  const testActualLogin = async () => {
    await runTest('Test Login (Real)', async () => {
      // Use test credentials - this will actually try to login
      return await authAPI.login('test@example.com', 'password123');
    });
  };

  const renderResult = () => {
    if (!results) return null;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>{results.testName}</Text>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: results.success ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>
            {results.success ? '✓ SUCCESS' : '✗ FAILED'}
          </Text>
        </View>

        <ScrollView style={styles.resultData}>
          <Text style={styles.resultText}>
            {JSON.stringify(results.data, null, 2)}
          </Text>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>API Debug Tools</Text>
        <Text style={styles.headerSubtitle}>
          Platform: {Platform.OS} | Dev Mode: {__DEV__ ? 'Yes' : 'No'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection Tests</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={testHealthEndpoint}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              🏥 Test Backend Health
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={testAuthEndpointCheck}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              🔐 Test Auth Endpoint
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={testFullDiagnostics}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              🔍 Run Full Diagnostics
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Tests</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={testActualLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              🧪 Test Real Login
            </Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Running test...</Text>
          </View>
        )}

        {renderResult()}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>📝 Instructions:</Text>
          <Text style={styles.infoText}>
            1. Ensure backend is running on port 8082{'\n'}
            2. Run "Backend Health Check" first{'\n'}
            3. If health check fails, verify:{'\n'}
            {'   '}• Backend server is running{'\n'}
            {'   '}• Port 8082 is accessible{'\n'}
            {'   '}• Firewall allows connections{'\n'}
            {'   '}• For real device: Use computer's IP{'\n'}
            4. Run "Full Diagnostics" for detailed info
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultData: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    maxHeight: 300,
  },
  resultText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#FFF3CD',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
  },
});

export default DebugAPIScreen;

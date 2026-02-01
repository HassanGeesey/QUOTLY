import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { processQuotation } from './src/orchestrator.js';
import { updateLineItemsTotals, calculateGrandTotal } from './src/logic.js';
import { company as defaultCompany, customer as defaultCustomer, lineItems as defaultLineItems } from './src/dataStructures.js';

import FormField from './src/components/FormField.js';
import LineItemRow from './src/components/LineItemRow.js';

export default function App() {
  const [quotation, setQuotation] = useState({
    date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
    company: defaultCompany,
    customer: defaultCustomer,
    lineItems: defaultLineItems,
    grandTotal: '0.00',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Synchronously update line items and grand total
  const syncQuotation = (newQuotation) => {
    const updatedLineItems = updateLineItemsTotals(newQuotation.lineItems);
    const total = calculateGrandTotal(updatedLineItems);
    setQuotation({
      ...newQuotation,
      lineItems: updatedLineItems,
      grandTotal: total,
    });
  };

  const handleUpdateItem = (index, updatedItem) => {
    const newItems = [...quotation.lineItems];
    newItems[index] = updatedItem;
    syncQuotation({ ...quotation, lineItems: newItems });
  };

  const handleAddItem = () => {
    const newItem = {
      no: quotation.lineItems.length + 1,
      qty: 1,
      unit: 'pcs',
      unitPrice: 0,
      description: '',
      total: '0.00',
    };
    syncQuotation({ ...quotation, lineItems: [...quotation.lineItems, newItem] });
  };

  const handleRemoveItem = (index) => {
    const newItems = quotation.lineItems.filter((_, i) => i !== index);
    syncQuotation({ ...quotation, lineItems: newItems });
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    try {
      // Use Mode B for API PDF generation (it includes validation)
      const blob = await processQuotation(quotation, 'B');
      Alert.alert(
        'Success',
        'Quotation PDF generated successfully! In a production environment, you would now use a library like react-native-share to view or send the file.'
      );
      console.log('PDF Blob received:', blob);

      // PRODUCTION TIP:
      // To save or share this PDF on mobile:
      // 1. Install react-native-blob-util and react-native-share
      // 2. Convert blob to base64
      // 3. Use Share.open({ url: `data:application/pdf;base64,${base64Data}` })
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex1}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Quotly Master Pro</Text>

          {/* Company Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Information</Text>
            <FormField
              label="Company Name"
              value={quotation.company.name}
              onChangeText={(text) => setQuotation({ ...quotation, company: { ...quotation.company, name: text } })}
            />
            <FormField
              label="Email"
              value={quotation.company.email}
              onChangeText={(text) => setQuotation({ ...quotation, company: { ...quotation.company, email: text } })}
              keyboardType="email-address"
            />
            <FormField
              label="Address"
              value={quotation.company.address}
              onChangeText={(text) => setQuotation({ ...quotation, company: { ...quotation.company, address: text } })}
            />
            <FormField
              label="Logo URL"
              value={quotation.company.logo}
              onChangeText={(text) => setQuotation({ ...quotation, company: { ...quotation.company, logo: text } })}
              placeholder="https://example.com/logo.png"
            />
            <FormField
              label="Mobile 1"
              value={quotation.company.mobiles[0]}
              onChangeText={(text) => {
                const newMobiles = [...quotation.company.mobiles];
                newMobiles[0] = text;
                setQuotation({ ...quotation, company: { ...quotation.company, mobiles: newMobiles } });
              }}
              keyboardType="phone-pad"
            />
            <FormField
              label="Landline"
              value={quotation.company.landline}
              onChangeText={(text) => setQuotation({ ...quotation, company: { ...quotation.company, landline: text } })}
              keyboardType="phone-pad"
            />
          </View>

          {/* Quotation Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quotation Details</Text>
            <FormField
              label="Date (DD/MM/YYYY)"
              value={quotation.date}
              onChangeText={(text) => setQuotation({ ...quotation, date: text })}
              placeholder="DD/MM/YYYY"
            />
          </View>

          {/* Customer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Information</Text>
            <FormField
              label="Customer Name"
              value={quotation.customer.name}
              onChangeText={(text) => setQuotation({ ...quotation, customer: { ...quotation.customer, name: text } })}
            />
          </View>

          {/* Line Items Section */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Line Items</Text>
              <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Item</Text>
              </TouchableOpacity>
            </View>

            {quotation.lineItems.map((item, index) => (
              <LineItemRow
                key={index}
                item={item}
                onUpdate={(updatedItem) => handleUpdateItem(index, updatedItem)}
                onRemove={() => handleRemoveItem(index)}
              />
            ))}
          </View>

          {/* Summary Section */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryLabel}>Grand Total</Text>
            <Text style={styles.grandTotal}>${quotation.grandTotal}</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={async () => {
              const result = await processQuotation(quotation, 'C');
              if (result.validation.isValid) {
                Alert.alert('Review', `Quotation is valid.\nGrand Total: $${result.quotation.grandTotal}`);
              } else {
                Alert.alert('Validation Errors', result.validation.errors.join('\n'));
              }
            }}
          >
            <Text style={styles.reviewButtonText}>Review Quotation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.generateButton, loading && styles.disabledButton]}
            onPress={handleGeneratePDF}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.generateButtonText}>Generate PDF</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  grandTotal: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reviewButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  reviewButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  generateButton: {
    backgroundColor: '#4F46E5',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

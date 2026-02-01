import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const LineItemRow = ({ item, onUpdate, onRemove }) => {
  const [qtyText, setQtyText] = React.useState(item.qty.toString());
  const [priceText, setPriceText] = React.useState(item.unitPrice.toString());

  // Keep local text in sync with item prop if it changes externally
  React.useEffect(() => {
    if (parseFloat(qtyText) !== item.qty) {
      setQtyText(item.qty.toString());
    }
  }, [item.qty]);

  React.useEffect(() => {
    if (parseFloat(priceText) !== item.unitPrice) {
      setPriceText(item.unitPrice.toString());
    }
  }, [item.unitPrice]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.itemNumber}>Item #{item.no}</Text>
        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.descriptionInput}
        value={item.description}
        onChangeText={(text) => onUpdate({ ...item, description: text })}
        placeholder="Description"
        multiline
      />

      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.smallLabel}>Qty</Text>
          <TextInput
            style={styles.input}
            value={qtyText}
            onChangeText={(text) => {
              setQtyText(text);
              const val = parseFloat(text);
              if (!isNaN(val)) onUpdate({ ...item, qty: val });
            }}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.smallLabel}>Unit Price</Text>
          <TextInput
            style={styles.input}
            value={priceText}
            onChangeText={(text) => {
              setPriceText(text);
              const val = parseFloat(text);
              if (!isNaN(val)) onUpdate({ ...item, unitPrice: val });
            }}
            keyboardType="numeric"
            placeholder="0.00"
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.smallLabel}>Total</Text>
          <Text style={styles.totalValue}>${item.total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemNumber: {
    fontWeight: 'bold',
    color: '#111827',
  },
  removeText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    minHeight: 40,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  smallLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    padding: 6,
    backgroundColor: '#FFFFFF',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
    color: '#059669',
  },
});

export default LineItemRow;

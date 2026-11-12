import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

type CourseListPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function CourseListPage({ title, subtitle, children }: CourseListPageProps) {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

export function CourseLoadingState({ label = 'Loading courses…' }: { label?: string }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#32063D" />
      <Text style={styles.stateText}>{label}</Text>
    </View>
  );
}

export function CourseEmptyState() {
  return (
    <View style={styles.messageCard}>
      <Text style={styles.messageTitle}>No courses yet</Text>
      <Text style={styles.messageBody}>When a course is added to Supabase, it will appear here.</Text>
    </View>
  );
}

export function CourseErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.messageCard}>
      <Text style={styles.errorTitle}>Couldn’t load courses</Text>
      <Text style={styles.messageBody}>{message}</Text>
      <Pressable style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Try again</Text>
      </Pressable>
    </View>
  );
}

export function CourseWarning({ children }: { children: ReactNode }) {
  return (
    <View style={styles.warning}>
      <Text style={styles.warningText}>{children}</Text>
    </View>
  );
}

export function CourseListEnd({ children }: { children: ReactNode }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F4F8', paddingHorizontal: 18, paddingTop: 18 },
  header: { marginBottom: 16 },
  heading: { color: '#24152A', fontSize: 25, fontWeight: '800' },
  subtitle: { marginTop: 5, color: '#716A75', fontSize: 14, lineHeight: 20 },
  body: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  stateText: { color: '#716A75', fontSize: 14 },
  messageCard: {
    marginTop: 24,
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEE8F1',
  },
  messageTitle: { color: '#24152A', fontSize: 17, fontWeight: '800' },
  errorTitle: { color: '#B42318', fontSize: 17, fontWeight: '800' },
  messageBody: { marginTop: 6, color: '#716A75', fontSize: 13, lineHeight: 19 },
  retryButton: { alignSelf: 'flex-start', marginTop: 14, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#32063D' },
  retryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  warning: { marginBottom: 12, padding: 12, borderRadius: 12, backgroundColor: '#FFF7E6', borderWidth: 1, borderColor: '#F2D28B' },
  warningText: { color: '#694A0B', fontSize: 12, lineHeight: 18 },
  footer: { alignItems: 'center', paddingVertical: 16 },
  footerText: { color: '#716A75', fontSize: 12 },
});

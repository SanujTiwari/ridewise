import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { Bus, MapPin, Search, AlertTriangle, Shield, Play, Square, Activity, Navigation, Heart, ArrowRight } from 'lucide-react-native';
import { useWebSocket } from './src/hooks/useWebSocket';
import type { UserRole, Bus as BusType, RouteSearchResult } from './src/types';

export default function App() {
  const [role, setRole] = useState<UserRole>('USER');
  const [activeTab, setActiveTab] = useState<'MAP' | 'SEARCH' | 'STOPS' | 'ALERTS'>('MAP');

  // Search state
  const [fromLocation, setFromLocation] = useState('Phagwara');
  const [toLocation, setToLocation] = useState('Jalandhar');
  const [searchResults, setSearchResults] = useState<RouteSearchResult[]>([]);

  // Driver state
  const [isDriving, setIsDriving] = useState(false);
  const [driverSpeed, setDriverSpeed] = useState(48);

  const { latestUpdate, isConnected: isWsConnected, sendLocationUpdate } = useWebSocket();

  // Dynamic Bus Dataset
  const [buses, setBuses] = useState<BusType[]>([
    {
      id: 'b-101',
      busNumber: 'BUS-101',
      registrationNumber: 'PB-08-AB-1234',
      capacity: 50,
      currentOccupancy: 32,
      status: 'ON_ROUTE',
      driverName: 'Harpreet Singh',
      routeName: 'Phagwara - Jalandhar Express',
      location: { latitude: 31.241, longitude: 75.735, speedKmH: 48, headingDegrees: 310, lastUpdated: new Date().toISOString() },
      nextStopName: 'LPU Gate 1',
      etaToNextStopMinutes: 7
    },
    {
      id: 'b-202',
      busNumber: 'BUS-202',
      registrationNumber: 'PB-08-XY-9876',
      capacity: 45,
      currentOccupancy: 18,
      status: 'ON_ROUTE',
      driverName: 'Rajesh Kumar',
      routeName: 'Jalandhar - Amritsar Superfast',
      location: { latitude: 31.253, longitude: 75.703, speedKmH: 52, headingDegrees: 285, lastUpdated: new Date().toISOString() },
      nextStopName: 'LPU Main Gate',
      etaToNextStopMinutes: 11
    }
  ]);

  // Update buses on incoming WebSocket stream
  useEffect(() => {
    if (latestUpdate) {
      setBuses((prev) =>
        prev.map((b) => {
          if (b.busNumber === latestUpdate.busNumber) {
            return {
              ...b,
              location: {
                ...b.location,
                latitude: latestUpdate.latitude,
                longitude: latestUpdate.longitude,
                speedKmH: latestUpdate.speedKmH,
                lastUpdated: latestUpdate.timestamp
              },
              nextStopName: latestUpdate.nextStopName,
              etaToNextStopMinutes: latestUpdate.etaToNextStopMinutes
            };
          }
          return b;
        })
      );
    }
  }, [latestUpdate]);

  const handleRouteSearch = () => {
    const fromLabel = fromLocation.trim() || 'Current Stop';
    const toLabel = toLocation.trim() || 'Terminal Hub';

    const results: RouteSearchResult[] = [
      {
        route: {
          id: 'r-dyn-1',
          routeNumber: '101-EXP',
          name: `${fromLabel} - ${toLabel} Express`,
          source: fromLabel,
          destination: toLabel,
          distanceKm: 24,
          estimatedDurationMinutes: 40,
          fareInr: 40,
          status: 'ACTIVE',
          stops: [
            { id: 's1', name: `${fromLabel} Bus Stand`, address: 'Main Hub', latitude: 31.224, longitude: 75.770, city: fromLabel, stopOrder: 1 },
            { id: 's2', name: 'LPU GT Road Gate', address: 'NH-44 Corridor', latitude: 31.253, longitude: 75.703, city: 'Phagwara', stopOrder: 2 },
            { id: 's3', name: `${toLabel} Central Terminal`, address: 'Main Station', latitude: 31.326, longitude: 75.576, city: toLabel, stopOrder: 3 }
          ]
        },
        bus: buses[0],
        nextBusEtaMinutes: 5,
        transfersCount: 0,
        departureTime: '10:30 AM',
        arrivalTime: '11:10 AM'
      }
    ];

    setSearchResults(results);
    setActiveTab('SEARCH');
  };

  const handleStartDriverTrip = () => {
    setIsDriving(true);
    sendLocationUpdate({
      event_type: 'BUS_LOCATION_UPDATE',
      busId: 'BUS-101',
      busNumber: 'BUS-101',
      latitude: 31.253,
      longitude: 75.703,
      speedKmH: driverSpeed,
      status: 'ON_ROUTE',
      nextStopName: 'LPU Main Gate',
      etaToNextStopMinutes: 4
    });
    Alert.alert('Trip Started', 'Live GPS telematics stream is broadcasting to all passengers.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#030712" />

      {/* App Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Bus color="#3b82f6" size={20} />
          </View>
          <View>
            <Text style={styles.brandText}>
              Ride<Text style={styles.brandHighlight}>Wise</Text>
            </Text>
            <Text style={styles.subtitleText}>SMART TRANSPORT MOBILE</Text>
          </View>
        </View>

        {/* Role Switcher Pill */}
        <View style={styles.roleContainer}>
          {(['USER', 'DRIVER', 'ADMIN'] as UserRole[]).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRole(r)}
              style={[styles.roleButton, role === r && styles.roleButtonActive]}
            >
              <Text style={[styles.roleText, role === r && styles.roleTextActive]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* WebSocket Telematics Banner */}
      <View style={styles.wsBanner}>
        <View style={[styles.wsDot, isWsConnected ? styles.wsDotConnected : styles.wsDotSimulated]} />
        <Text style={styles.wsText}>
          {isWsConnected ? 'LIVE WEBSOCKET STREAM ACTIVE' : 'TELEMATICS SIMULATOR CONNECTED'}
        </Text>
      </View>

      {/* PASSENGER VIEW */}
      {role === 'USER' && (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
            
            {/* Quick Location Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>CURRENT LOCATION</Text>
                <MapPin color="#38bdf8" size={16} />
              </View>
              <Text style={styles.locationName}>Phagwara GT Road Sector 4</Text>
              <Text style={styles.cardSubtext}>GPS Accuracy: ±4 meters</Text>
            </View>

            {/* Route Search Input Box */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>FIND BUS ROUTE</Text>
              
              <View style={styles.inputGroup}>
                <MapPin color="#64748b" size={16} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Departure (e.g. Phagwara)"
                  placeholderTextColor="#64748b"
                  value={fromLocation}
                  onChangeText={setFromLocation}
                />
              </View>

              <View style={styles.inputGroup}>
                <Navigation color="#64748b" size={16} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Destination (e.g. Jalandhar)"
                  placeholderTextColor="#64748b"
                  value={toLocation}
                  onChangeText={setToLocation}
                />
              </View>

              <TouchableOpacity style={styles.searchButton} onPress={handleRouteSearch}>
                <Search color="#ffffff" size={16} />
                <Text style={styles.searchButtonText}>Search Available Buses</Text>
              </TouchableOpacity>
            </View>

            {/* TAB CONTENT: LIVE TELEMATICS BUSES */}
            {activeTab === 'MAP' && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Upcoming Buses & ETAs</Text>
                  <Text style={styles.liveBadge}>SUB-SECOND</Text>
                </View>

                {buses.map((bus) => (
                  <View key={bus.id} style={styles.busCard}>
                    <View style={styles.busCardHeader}>
                      <View style={styles.busBadge}>
                        <Text style={styles.busBadgeText}>{bus.busNumber}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.routeName}>{bus.routeName}</Text>
                        <Text style={styles.driverName}>Driver: {bus.driverName}</Text>
                      </View>
                      <View style={styles.etaBadge}>
                        <Text style={styles.etaText}>ETA {bus.etaToNextStopMinutes} min</Text>
                      </View>
                    </View>

                    <View style={styles.busDetailsRow}>
                      <Text style={styles.detailLabel}>Next Stop:</Text>
                      <Text style={styles.detailValue}>{bus.nextStopName}</Text>
                    </View>

                    <View style={styles.busDetailsRow}>
                      <Text style={styles.detailLabel}>Occupancy:</Text>
                      <Text style={styles.detailValue}>{bus.currentOccupancy}/{bus.capacity} seats</Text>
                    </View>

                    <View style={styles.busDetailsRow}>
                      <Text style={styles.detailLabel}>Speed:</Text>
                      <Text style={styles.detailValue}>{bus.location.speedKmH} km/h</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* TAB CONTENT: ROUTE SEARCH RESULTS */}
            {activeTab === 'SEARCH' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Transit Options</Text>
                {searchResults.map((res, idx) => (
                  <View key={idx} style={styles.busCard}>
                    <View style={styles.busCardHeader}>
                      <View style={styles.busBadge}>
                        <Text style={styles.busBadgeText}>{res.route.routeNumber}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.routeName}>{res.route.name}</Text>
                        <Text style={styles.driverName}>{res.route.source} ➔ {res.route.destination}</Text>
                      </View>
                      <Text style={styles.fareText}>₹{res.route.fareInr}</Text>
                    </View>

                    <View style={styles.specsRow}>
                      <View style={styles.specBox}>
                        <Text style={styles.specLabel}>Duration</Text>
                        <Text style={styles.specVal}>{res.route.estimatedDurationMinutes} min</Text>
                      </View>
                      <View style={styles.specBox}>
                        <Text style={styles.specLabel}>Stops</Text>
                        <Text style={styles.specVal}>{res.route.stops.length} stops</Text>
                      </View>
                      <View style={styles.specBox}>
                        <Text style={styles.specLabel}>Next ETA</Text>
                        <Text style={styles.specValHighlight}>{res.nextBusEtaMinutes} min</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

          </ScrollView>

          {/* Bottom Tab Bar */}
          <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('MAP')}>
              <Activity color={activeTab === 'MAP' ? '#3b82f6' : '#64748b'} size={20} />
              <Text style={[styles.tabLabel, activeTab === 'MAP' && styles.tabLabelActive]}>Live Map</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('SEARCH')}>
              <Search color={activeTab === 'SEARCH' ? '#3b82f6' : '#64748b'} size={20} />
              <Text style={[styles.tabLabel, activeTab === 'SEARCH' && styles.tabLabelActive]}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* DRIVER TELEMATICS MODE */}
      {role === 'DRIVER' && (
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>ASSIGNED BUS TELEMATICS</Text>
            <View style={styles.busDetailsRow}>
              <Text style={styles.detailLabel}>Vehicle ID:</Text>
              <Text style={styles.detailValue}>BUS-101</Text>
            </View>
            <View style={styles.busDetailsRow}>
              <Text style={styles.detailLabel}>Reg Number:</Text>
              <Text style={styles.detailValue}>PB-08-AB-1234</Text>
            </View>
            <View style={styles.busDetailsRow}>
              <Text style={styles.detailLabel}>Route:</Text>
              <Text style={styles.detailValue}>Phagwara - Jalandhar Express</Text>
            </View>

            <TouchableOpacity
              style={[styles.driverTripButton, isDriving && styles.driverTripButtonStop]}
              onPress={() => (isDriving ? setIsDriving(false) : handleStartDriverTrip())}
            >
              {isDriving ? <Square color="#ffffff" size={18} /> : <Play color="#ffffff" size={18} />}
              <Text style={styles.driverTripButtonText}>
                {isDriving ? 'STOP TRIP & TELEMATICS' : 'START TRIP & BROADCAST GPS'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* ADMIN PORTAL MODE */}
      {role === 'ADMIN' && (
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>FLEET MANAGEMENT SYSTEM</Text>
            <View style={styles.busDetailsRow}>
              <Text style={styles.detailLabel}>Total Fleet Buses:</Text>
              <Text style={styles.detailValue}>48 Active</Text>
            </View>
            <View style={styles.busDetailsRow}>
              <Text style={styles.detailLabel}>Active Drivers:</Text>
              <Text style={styles.detailValue}>54 Registered</Text>
            </View>
            <View style={styles.busDetailsRow}>
              <Text style={styles.detailLabel}>On-Time Performance:</Text>
              <Text style={styles.detailValue}>96.4%</Text>
            </View>
          </View>
        </ScrollView>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0b0f19',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  brandHighlight: {
    color: '#38bdf8',
  },
  subtitleText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#3b82f6',
    letterSpacing: 1,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  roleButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  roleButtonActive: {
    backgroundColor: '#2563eb',
  },
  roleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
  },
  roleTextActive: {
    color: '#ffffff',
  },
  wsBanner: {
    backgroundColor: '#0f172a',
    paddingVertical: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  wsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  wsDotConnected: {
    backgroundColor: '#34d399',
  },
  wsDotSimulated: {
    backgroundColor: '#fbbf24',
  },
  wsText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#38bdf8',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#0b0f19',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 1,
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  cardSubtext: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#ffffff',
    fontSize: 13,
  },
  searchButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
    marginLeft: 6,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  liveBadge: {
    fontSize: 9,
    fontWeight: '900',
    color: '#34d399',
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  busCard: {
    backgroundColor: '#0b0f19',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 12,
  },
  busCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  busBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  busBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#3b82f6',
  },
  routeName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  driverName: {
    fontSize: 11,
    color: '#64748b',
  },
  etaBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  etaText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38bdf8',
  },
  busDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  fareText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
  },
  specsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  specBox: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 8,
    color: '#64748b',
    fontWeight: '700',
  },
  specVal: {
    fontSize: 11,
    fontWeight: '800',
    color: '#e2e8f0',
  },
  specValHighlight: {
    fontSize: 11,
    fontWeight: '900',
    color: '#38bdf8',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#0b0f19',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#3b82f6',
  },
  driverTripButton: {
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  driverTripButtonStop: {
    backgroundColor: '#dc2626',
  },
  driverTripButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
    marginLeft: 6,
  },
});

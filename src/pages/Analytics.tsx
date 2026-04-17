import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Download, Calendar, Activity, 
  Cpu, Database, Globe, Layers, Zap, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';

// Mock Data
const USAGE_DATA = [
  { name: 'Mon', requests: 4000, tokens: 2400 },
  { name: 'Tue', requests: 3000, tokens: 1398 },
  { name: 'Wed', requests: 2000, tokens: 9800 },
  { name: 'Thu', requests: 2780, tokens: 3908 },
  { name: 'Fri', requests: 1890, tokens: 4800 },
  { name: 'Sat', requests: 2390, tokens: 3800 },
  { name: 'Sun', requests: 3490, tokens: 4300 },
];

const BUILDS_DATA = [
  { name: 'Mon', success: 12, failed: 1 },
  { name: 'Tue', success: 19, failed: 2 },
  { name: 'Wed', success: 15, failed: 0 },
  { name: 'Thu', success: 22, failed: 3 },
  { name: 'Fri', success: 18, failed: 1 },
  { name: 'Sat', success: 8, failed: 0 },
  { name: 'Sun', success: 10, failed: 1 },
];

const PROJECT_DISTRIBUTION = [
  { name: 'Frontend', value: 400 },
  { name: 'Full-Stack', value: 300 },
  { name: 'Backend', value: 300 },
  { name: 'Static', value: 200 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

const MAP_MARKERS = [
  { id: 1, position: [37.7749, -122.4194] as [number, number], city: 'San Francisco', users: 1200 },
  { id: 2, position: [40.7128, -74.0060] as [number, number], city: 'New York', users: 850 },
  { id: 3, position: [51.5074, -0.1278] as [number, number], city: 'London', users: 640 },
  { id: 4, position: [35.6762, 139.6503] as [number, number], city: 'Tokyo', users: 420 },
  { id: 5, position: [-33.8688, 151.2093] as [number, number], city: 'Sydney', users: 310 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d');

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Platform-level metrics and usage statistics.</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] bg-surface border-white/10 text-white">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* AI Usage */}
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary">
                <Zap className="w-5 h-5" />
                <h3 className="font-medium text-white">AI Usage</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Tokens Used</span>
                  <span className="text-white font-medium">1.2M / 2M</span>
                </div>
                <Progress value={60} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Requests this month</p>
                  <p className="text-2xl font-bold text-white">45,231</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">+12%</Badge>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Layers className="w-5 h-5" />
                <h3 className="font-medium text-white">Projects</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Active</p>
                <p className="text-2xl font-bold text-white">18</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Deployed</p>
                <p className="text-xl font-semibold text-white">12</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Archived</p>
                <p className="text-xl font-semibold text-gray-400">6</p>
              </div>
            </div>
          </div>

          {/* Deployments */}
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-5 h-5" />
                <h3 className="font-medium text-white">Deployments</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total Builds</span>
                <span className="text-white font-medium">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Success Rate</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 94.5%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Avg Build Time</span>
                <span className="text-white font-medium">45s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Failed Builds</span>
                <span className="text-destructive font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> 8
                </span>
              </div>
            </div>
          </div>

          {/* Database */}
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-orange-400">
                <Database className="w-5 h-5" />
                <h3 className="font-medium text-white">Database</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total Queries</span>
                <span className="text-white font-medium">2.4M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Error Rate</span>
                <span className="text-white font-medium">0.02%</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Storage Used</span>
                  <span className="text-white font-medium">4.2 GB / 10 GB</span>
                </div>
                <Progress value={42} className="h-2 bg-white/10" indicatorClassName="bg-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart: AI Usage Over Time */}
          <div className="bg-surface border border-white/10 rounded-xl p-5 lg:col-span-2">
            <h3 className="font-medium text-white mb-6">AI Usage Over Time</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={USAGE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} name="Requests" />
                  <Line yAxisId="right" type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="Tokens" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart: Projects by Type */}
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <h3 className="font-medium text-white mb-6">Projects by Type</h3>
            <div className="h-[300px] w-full flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PROJECT_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PROJECT_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart: Builds per Day */}
          <div className="bg-surface border border-white/10 rounded-xl p-5">
            <h3 className="font-medium text-white mb-6">Builds per Day</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUILDS_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', color: '#fff' }}
                    cursor={{ fill: '#2a2a2a' }}
                  />
                  <Legend />
                  <Bar dataKey="success" stackId="a" fill="#10b981" name="Successful" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Map */}
          <div className="bg-surface border border-white/10 rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-white">Global Traffic</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex flex-col items-end">
                  <span className="text-gray-400">Page Views</span>
                  <span className="text-white font-medium">124.5K</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-400">Unique Visitors</span>
                  <span className="text-white font-medium">42.1K</span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-h-[300px] rounded-lg overflow-hidden border border-white/10 relative z-0">
              <MapContainer 
                center={[20, 0]} 
                zoom={2} 
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {MAP_MARKERS.map((marker) => (
                  <CircleMarker
                    key={marker.id}
                    center={marker.position}
                    radius={Math.max(5, marker.users / 100)}
                    fillColor="#8b5cf6"
                    color="#8b5cf6"
                    weight={1}
                    opacity={0.8}
                    fillOpacity={0.4}
                  >
                    <Popup className="custom-popup">
                      <div className="text-gray-900 font-medium">{marker.city}</div>
                      <div className="text-gray-600 text-sm">{marker.users} active users</div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

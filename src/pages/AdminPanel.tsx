import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ShieldAlert, Users, Globe, Activity } from "lucide-react";

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .order("createdAt", { ascending: false });
          
        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 font-display">
            <ShieldAlert className="w-6 h-6 text-error" />
            Admin Overview
          </h2>
          <p className="text-text-muted">Manage users, monitor platform activity, and view system health.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-surface border-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Total Users</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-display">{users.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-surface border-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Active Subscriptions</CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-display">{users.filter(u => u.subscription !== 'free').length}</div>
            </CardContent>
          </Card>
          <Card className="bg-surface border-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-text-muted">Platform Health</CardTitle>
              <Globe className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success font-display">99.9%</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-surface border-card">
          <CardHeader>
            <CardTitle className="font-display">User Management</CardTitle>
            <CardDescription className="text-text-muted">All registered users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-text-muted">Loading users...</div>
            ) : (
              <Table>
                <TableHeader className="bg-card hover:bg-card">
                  <TableRow className="border-card hover:bg-card">
                    <TableHead className="text-text-muted">User</TableHead>
                    <TableHead className="text-text-muted">Role</TableHead>
                    <TableHead className="text-text-muted">Subscription</TableHead>
                    <TableHead className="text-text-muted">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-card hover:bg-card/50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-text-primary">{user.name || 'Unknown'}</span>
                          <span className="text-xs text-text-muted">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className={user.role === 'admin' ? 'bg-error text-white' : 'bg-card text-text-muted'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize border-card text-text-primary">
                          {user.subscription || 'free'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-text-muted font-mono">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

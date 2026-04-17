import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function PlaceholderPage({ title, description }: { title: string, description: string }) {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight font-display mb-2">{title}</h2>
          <p className="text-text-muted">{description}</p>
        </div>
        
        <Card className="bg-surface border-card border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Construction className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-display mb-2">Under Construction</h3>
            <p className="text-text-muted max-w-md">
              We're working hard to bring you the {title.toLowerCase()} features. 
              Check back soon for updates!
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

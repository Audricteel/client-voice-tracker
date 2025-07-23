import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeedbackData } from './FeedbackForm';

export const FeedbackTable = () => {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);

  useEffect(() => {
    // Load feedback from localStorage
    const storedFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    setFeedback(storedFeedback);
  }, []);

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === 'done' ? 'default' : 'secondary'}
        className={status === 'done' ? 'bg-success text-success-foreground' : ''}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getFeedbackTypeBadge = (type: string) => {
    return (
      <Badge 
        variant={type === 'positive' ? 'default' : 'destructive'}
        className={type === 'positive' ? 'bg-success text-success-foreground' : ''}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Customer Feedback Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Service Provider</TableHead>
                <TableHead>Brand/Platform</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Particulars</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead>Action Taken</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
                    No feedback reports available. Submit feedback to see data here.
                  </TableCell>
                </TableRow>
              ) : (
                feedback.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.serviceProvider}</TableCell>
                    <TableCell>{item.brandPlatform}</TableCell>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>{item.customerEmail || '-'}</TableCell>
                    <TableCell>{getFeedbackTypeBadge(item.feedbackType)}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.feedbackParticulars}>
                      {item.feedbackParticulars}
                    </TableCell>
                    <TableCell>{formatDateTime(item.dateTimeReceived)}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.actionTaken}>
                      {item.actionTaken}
                    </TableCell>
                    <TableCell>{item.hoursToAction}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.submittedBy}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
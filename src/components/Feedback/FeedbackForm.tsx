import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export interface FeedbackData {
  id: number;
  serviceProvider: string;
  brandPlatform: string;
  month: string;
  customerEmail?: string;
  feedbackType: 'positive' | 'negative';
  feedbackParticulars: string;
  dateTimeReceived: string;
  actionTaken: string;
  hoursToAction: string;
  status: 'open' | 'done';
  submittedBy: string;
  submittedAt: string;
}

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    serviceProvider: '',
    brandPlatform: '',
    month: '',
    customerEmail: '',
    feedbackType: 'positive' as 'positive' | 'negative',
    feedbackParticulars: '',
    dateTimeReceived: '',
    actionTaken: '',
    hoursToAction: '',
    status: 'open' as 'open' | 'done'
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    
    const newFeedback: FeedbackData = {
      id: existingFeedback.length + 1,
      ...formData,
      submittedBy: 'Current User',
      submittedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const updatedFeedback = [...existingFeedback, newFeedback];
    localStorage.setItem('feedback', JSON.stringify(updatedFeedback));
    
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been successfully submitted.",
    });
    
    // Reset form
    setFormData({
      serviceProvider: '',
      brandPlatform: '',
      month: '',
      customerEmail: '',
      feedbackType: 'positive',
      feedbackParticulars: '',
      dateTimeReceived: '',
      actionTaken: '',
      hoursToAction: '',
      status: 'open'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Submit Customer Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="serviceProvider">Service Provider</Label>
              <Input
                id="serviceProvider"
                placeholder="Enter service provider"
                value={formData.serviceProvider}
                onChange={(e) => handleInputChange('serviceProvider', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brandPlatform">Brand/Online Gaming Platform</Label>
              <Input
                id="brandPlatform"
                placeholder="Enter brand or platform"
                value={formData.brandPlatform}
                onChange={(e) => handleInputChange('brandPlatform', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="month">For the Month of</Label>
              <Input
                id="month"
                type="month"
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email (Optional)</Label>
              <Input
                id="customerEmail"
                type="email"
                placeholder="customer@example.com"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedbackType">Feedback Type</Label>
              <Select value={formData.feedbackType} onValueChange={(value) => handleInputChange('feedbackType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateTimeReceived">Date & Time Received</Label>
              <Input
                id="dateTimeReceived"
                type="datetime-local"
                value={formData.dateTimeReceived}
                onChange={(e) => handleInputChange('dateTimeReceived', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoursToAction">Hours from Receipt to Action (hrs/mins)</Label>
              <Input
                id="hoursToAction"
                placeholder="e.g., 2 hours 30 minutes"
                value={formData.hoursToAction}
                onChange={(e) => handleInputChange('hoursToAction', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedbackParticulars">Feedback Particulars</Label>
            <Textarea
              id="feedbackParticulars"
              placeholder="Enter detailed feedback particulars..."
              rows={4}
              value={formData.feedbackParticulars}
              onChange={(e) => handleInputChange('feedbackParticulars', e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="actionTaken">Action Taken</Label>
            <Textarea
              id="actionTaken"
              placeholder="Describe the action taken..."
              rows={3}
              value={formData.actionTaken}
              onChange={(e) => handleInputChange('actionTaken', e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
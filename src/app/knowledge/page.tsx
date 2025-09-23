"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Database, 
  Search, 
  Plus, 
  FileText,
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isIndexing, setIsIndexing] = useState(false);

  const handleReindex = () => {
    setIsIndexing(true);
    setTimeout(() => {
      setIsIndexing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage knowledge base content and search capabilities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReindex} disabled={isIndexing}>
            {isIndexing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Indexing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reindex
              </>
            )}
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Document
          </Button>
        </div>
      </div>

      {/* Knowledge Base Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Index Size</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4GB</div>
            <p className="text-xs text-muted-foreground">
              Vector embeddings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Accuracy</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1h</div>
            <p className="text-xs text-muted-foreground">
              ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Base Management */}
      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">Search & Browse</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Search</CardTitle>
              <CardDescription>Search through knowledge base documents and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input 
                    placeholder="Search knowledge base..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Search Results */}
              <div className="space-y-4">
                <h4 className="font-medium">Search Results</h4>
                <div className="space-y-3">
                  {[
                    {
                      title: "Billing Process Guidelines",
                      category: "Procedures",
                      relevance: 95,
                      snippet: "Complete guide for handling billing inquiries and payment processing...",
                      lastUpdated: "2024-01-15"
                    },
                    {
                      title: "Customer Support Scripts",
                      category: "Scripts",
                      relevance: 87,
                      snippet: "Standard responses and escalation procedures for customer support...",
                      lastUpdated: "2024-01-14"
                    },
                    {
                      title: "Product Information Database",
                      category: "Products",
                      relevance: 82,
                      snippet: "Comprehensive product specifications and feature descriptions...",
                      lastUpdated: "2024-01-13"
                    },
                  ].map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h5 className="font-medium">{result.title}</h5>
                            <Badge variant="outline">{result.category}</Badge>
                            <Badge variant="secondary">{result.relevance}% match</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{result.snippet}</p>
                          <p className="text-xs text-muted-foreground">Last updated: {result.lastUpdated}</p>
                        </div>
                        <div className="flex space-x-1 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Manage knowledge base documents and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      { name: "Procedures", count: 245, status: "active" },
                      { name: "Scripts", count: 189, status: "active" },
                      { name: "Products", count: 156, status: "active" },
                      { name: "Policies", count: 98, status: "active" },
                      { name: "FAQ", count: 234, status: "active" },
                      { name: "Training", count: 67, status: "inactive" },
                    ].map((category, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">{category.count} documents</div>
                          </div>
                          <Badge variant={category.status === "active" ? "default" : "secondary"}>
                            {category.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Documents */}
                <div>
                  <h4 className="font-medium mb-3">Recent Documents</h4>
                  <div className="space-y-2">
                    {[
                      { title: "Updated Billing Guidelines v2.1", category: "Procedures", date: "2024-01-15", status: "published" },
                      { title: "New Product Launch FAQ", category: "FAQ", date: "2024-01-14", status: "draft" },
                      { title: "Customer Escalation Process", category: "Scripts", date: "2024-01-13", status: "published" },
                      { title: "Privacy Policy Updates", category: "Policies", date: "2024-01-12", status: "review" },
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">{doc.category} • {doc.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={doc.status === "published" ? "default" : doc.status === "draft" ? "secondary" : "outline"}>
                            {doc.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>Add new documents to the knowledge base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-sm font-medium mb-2">Drop files here or click to browse</div>
                  <div className="text-xs text-muted-foreground">Supports PDF, DOC, TXT, MD files up to 10MB</div>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doc-title">Document Title</Label>
                  <Input id="doc-title" placeholder="Enter document title" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doc-category">Category</Label>
                  <Input id="doc-category" placeholder="Enter category" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="doc-description">Description</Label>
                  <Textarea id="doc-description" placeholder="Enter document description" rows={3} />
                </div>
                
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>Import multiple documents at once</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="import-source">Import Source</Label>
                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Import from Database
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Import from CSV
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Import from URL
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h5 className="font-medium mb-2">Import Status</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last import:</span>
                      <span>2024-01-15 14:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Documents imported:</span>
                      <span>23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="default">Completed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Search Configuration</CardTitle>
                <CardDescription>Configure search and indexing settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="similarity-threshold">Similarity Threshold</Label>
                  <Input id="similarity-threshold" type="number" defaultValue="0.8" step="0.1" min="0" max="1" />
                  <p className="text-xs text-muted-foreground">Minimum similarity score for search results</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-results">Max Results</Label>
                  <Input id="max-results" type="number" defaultValue="20" min="1" max="100" />
                  <p className="text-xs text-muted-foreground">Maximum number of search results to return</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="index-refresh">Index Refresh Interval</Label>
                  <Input id="index-refresh" defaultValue="1 hour" />
                  <p className="text-xs text-muted-foreground">How often to refresh the search index</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Index Status</CardTitle>
                <CardDescription>Current indexing status and health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Index Health</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Healthy</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Indexed</span>
                    <span className="text-sm text-muted-foreground">1 hour ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Index Size</span>
                    <span className="text-sm text-muted-foreground">2.4 GB</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Pending Updates</span>
                    <Badge variant="outline">0</Badge>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleReindex} disabled={isIndexing}>
                  {isIndexing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Reindexing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Force Reindex
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
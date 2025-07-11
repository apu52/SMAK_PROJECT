
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Camera,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Plus,
  Moon,
  Sun,
  Search,
  Upload,
  X,
  Send,
  Loader2
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from "@/hooks/use-toast";

// Firebase imports
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { db, storage } from '../firebase';

const MedicalGallery = () => {
  const { theme, setTheme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newPost, setNewPost] = useState({
    caption: '',
    description: '',
    image: null,
    imageFile: null,
    user: {
      name: '',
      college: 'SMAK Medical College',
      department: ''
    }
  });
  const fileInputRef = useRef(null);

  // Load posts from Firebase on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(
        query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
        (snapshot) => {
          const postsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          }));
          setPosts(postsData);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching posts:', error);
          toast({
            title: "Error loading posts",
            description: "Failed to load posts from database",
            variant: "destructive"
          });
          setLoading(false);
        }
    );

    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post =>
      post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user?.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLikePost = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const post = posts.find(p => p.id === postId);

      if (!post) return;

      const currentLiked = post.likedBy && post.likedBy.includes('current-user');

      if (currentLiked) {
        // Unlike the post
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: post.likedBy.filter(id => id !== 'current-user')
        });
      } else {
        // Like the post
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion('current-user')
        });
      }

      toast({
        title: currentLiked ? "Post unliked" : "Post liked",
        description: currentLiked ? "Removed from your likes" : "Added to your likes"
      });
    } catch (error) {
      console.error('Error updating like:', error);
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive"
      });
    }
  };

  const handleBookmarkPost = async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const post = posts.find(p => p.id === postId);

      if (!post) return;

      const currentBookmarked = post.bookmarkedBy && post.bookmarkedBy.includes('current-user');

      if (currentBookmarked) {
        // Remove bookmark
        await updateDoc(postRef, {
          bookmarkedBy: post.bookmarkedBy.filter(id => id !== 'current-user')
        });
      } else {
        // Add bookmark
        await updateDoc(postRef, {
          bookmarkedBy: arrayUnion('current-user')
        });
      }

      toast({
        title: currentBookmarked ? "Bookmark removed" : "Post bookmarked",
        description: currentBookmarked ? "Removed from your bookmarks" : "Added to your bookmarks"
      });
    } catch (error) {
      console.error('Error updating bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "destructive"
      });
    }
  };

  const handleSharePost = (postId) => {
    const shareUrl = `${window.location.origin}/gallery/post/${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link copied to clipboard!",
        description: "Share this medical moment with others"
      });
    });
  };

  const handleAddComment = async () => {
    if (newComment.trim() && selectedPost) {
      try {
        const postRef = doc(db, 'posts', selectedPost.id);
        const comment = {
          id: `comment_${Date.now()}`,
          user: 'You',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
          text: newComment.trim(),
          createdAt: new Date()
        };

        await updateDoc(postRef, {
          comments: arrayUnion(comment)
        });

        setNewComment('');
        toast({
          title: "Comment added!",
          description: "Your comment has been posted"
        });
      } catch (error) {
        console.error('Error adding comment:', error);
        toast({
          title: "Error",
          description: "Failed to add comment",
          variant: "destructive"
        });
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Please select an image file');
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Image size should be less than 5MB');
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);

        setNewPost({
          ...newPost,
          image: previewUrl,
          imageFile: file
        });

        toast({
          title: "Image selected successfully!",
          description: "Your medical image is ready to be uploaded"
        });
      } catch (error) {
        console.error('Error selecting image:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to select image",
          variant: "destructive"
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const uploadImageToStorage = async (file) => {
    const timestamp = Date.now();
    const fileName = `medical-posts/${timestamp}_${file.name}`;
    const imageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  };

  const handleCreatePost = async () => {
    if (newPost.caption.trim() && newPost.user.name.trim() && newPost.user.department.trim()) {
      setSubmitting(true);
      try {
        let imageUrl = null;

        // Upload image if provided
        if (newPost.imageFile) {
          imageUrl = await uploadImageToStorage(newPost.imageFile);
        }

        // Generate grid size randomly for visual variety
        const gridSizes = ['small', 'medium', 'large'];
        const randomGridSize = gridSizes[Math.floor(Math.random() * gridSizes.length)];

        const postData = {
          user: {
            name: newPost.user.name,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            verified: false,
            college: newPost.user.college,
            department: newPost.user.department
          },
          image: imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
          caption: newPost.caption,
          description: newPost.description,
          likes: 0,
          comments: [],
          likedBy: [],
          bookmarkedBy: [],
          gridSize: randomGridSize,
          createdAt: serverTimestamp()
        };

        await addDoc(collection(db, 'posts'), postData);

        // Reset form
        setNewPost({
          caption: '',
          description: '',
          image: null,
          imageFile: null,
          user: { name: '', college: 'SMAK Medical College', department: '' }
        });

        setIsCreateModalOpen(false);

        toast({
          title: "Post created successfully!",
          description: "Your medical post has been shared with the community"
        });
      } catch (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Error creating post",
          description: error.message || "Failed to create post",
          variant: "destructive"
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const getGridItemClass = (size) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      case 'small':
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return 'Unknown';

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-blue-600 dark:text-blue-400">Loading medical gallery...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-blue-200 dark:border-slate-700 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      SMAK Gallery
                    </h1>
                    <p className="text-sm text-blue-600 dark:text-blue-400">SMAK Medical College</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                  <Input
                      placeholder="Search medical posts, doctors, departments..."
                      className="pl-10 rounded-full border-2 border-blue-200 dark:border-slate-600 focus:border-blue-500 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="rounded-full hover:bg-blue-100 dark:hover:bg-slate-700"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>

                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-blue-800 dark:text-blue-300">Share Medical Moment</DialogTitle>
                      <DialogDescription>Share your medical experience with the SMAK community</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-blue-700 dark:text-blue-300">Your Name</label>
                          <Input
                              placeholder="Dr. John Doe"
                              value={newPost.user.name}
                              onChange={(e) => setNewPost({ ...newPost, user: { ...newPost.user, name: e.target.value }})}
                              className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-blue-700 dark:text-blue-300">Department</label>
                          <Select onValueChange={(value) => setNewPost({ ...newPost, user: { ...newPost.user, department: value }})}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cardiology">Cardiology</SelectItem>
                              <SelectItem value="Neurology">Neurology</SelectItem>
                              <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                              <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                              <SelectItem value="Radiology">Radiology</SelectItem>
                              <SelectItem value="Surgery">Surgery</SelectItem>
                              <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                              <SelectItem value="Research Division">Research Division</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-xl border-2 border-dashed border-blue-300 dark:border-slate-600 flex items-center justify-center relative overflow-hidden">
                        {uploading ? (
                            <div className="text-center">
                              <Loader2 className="h-16 w-16 mx-auto mb-4 text-blue-400 animate-spin" />
                              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">Processing Image...</p>
                            </div>
                        ) : newPost.image ? (
                            <img src={newPost.image} alt="Upload preview" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            <div className="text-center">
                              <Camera className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">Upload Medical Image</p>
                              <p className="text-sm text-blue-500 dark:text-blue-300">Share your medical moments</p>
                            </div>
                        )}
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-4 right-4 rounded-full"
                            size="sm"
                            disabled={uploading}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                      />

                      <div>
                        <label className="text-sm font-medium text-blue-700 dark:text-blue-300">Caption</label>
                        <Textarea
                            placeholder="Share what makes this moment special..."
                            value={newPost.caption}
                            onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                            className="mt-1 min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-blue-700 dark:text-blue-300">Detailed Description</label>
                        <Textarea
                            placeholder="Provide more details about this medical case, procedure, or moment..."
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                            className="mt-1 min-h-[100px]"
                        />
                      </div>

                      <Button
                          onClick={handleCreatePost}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg py-3"
                          disabled={!newPost.caption.trim() || !newPost.user.name.trim() || !newPost.user.department || submitting}
                      >
                        {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Post...
                            </>
                        ) : (
                            'Share Medical Post'
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Main Gallery Grid */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    className={`group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border-0 shadow-lg ${getGridItemClass(post.gridSize)}`}
                    onClick={() => openPostModal(post)}
                >
                  <div className="relative w-full h-full">
                    <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-white space-y-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12 border-2 border-white/50">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{post.user.name}</h3>
                              {post.user.verified && (
                                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                              )}
                            </div>
                            <p className="text-blue-200 text-sm">{post.user.college}</p>
                            <p className="text-blue-300 text-sm font-medium">{post.user.department}</p>
                          </div>
                        </div>

                        <p className="text-white/90 text-sm line-clamp-3">{post.caption}</p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-4 text-white/80">
                        <span className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes || 0}</span>
                        </span>
                            <span className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments?.length || 0}</span>
                        </span>
                          </div>
                          <Badge variant="secondary" className="bg-blue-500/80 text-white">
                            {formatTimeAgo(post.createdAt)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-16">
                <Camera className="h-24 w-24 mx-auto text-blue-300 mb-4" />
                <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-2">No posts found</h3>
                <p className="text-blue-600 dark:text-blue-400">Try adjusting your search terms or create the first post!</p>
              </div>
          )}
        </main>

        {/* Post Detail Modal */}
        {selectedPost && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden bg-white dark:bg-slate-900">
                <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[95vh]">
                  {/* Image Section */}
                  <div className="relative bg-black flex items-center justify-center">
                    <img
                        src={selectedPost.image}
                        alt={selectedPost.caption}
                        className="max-w-full max-h-full object-contain"
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col max-h-[95vh]">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={selectedPost.user.avatar} />
                          <AvatarFallback>{selectedPost.user.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300">{selectedPost.user.name}</h3>
                            {selectedPost.user.verified && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                          </div>
                          <p className="text-blue-600 dark:text-blue-400 text-sm">{selectedPost.user.college}</p>
                          <Badge variant="outline" className="mt-1">{selectedPost.user.department}</Badge>
                        </div>
                        <span className="text-sm text-gray-500">{formatTimeAgo(selectedPost.createdAt)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">{selectedPost.caption}</h4>
                        {selectedPost.description && (
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedPost.description}</p>
                        )}
                      </div>

                      {/* Comments */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-blue-800 dark:text-blue-300">Comments ({selectedPost.comments?.length || 0})</h5>
                        {selectedPost.comments?.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.user?.[0] || 'U'}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-3">
                                <p className="font-medium text-sm text-blue-800 dark:text-blue-300">{comment.user}</p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.text}</p>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>

                {/* Actions & Comment Input */}
                <div className="p-6 border-t border-gray-200 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto hover:scale-110 transition-transform"
                        onClick={() => handleLikePost(selectedPost.id)}
                      >
                        <Heart className={`h-7 w-7 ${selectedPost.liked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto hover:scale-110 transition-transform"
                        onClick={() => handleSharePost(selectedPost.id)}
                      >
                        <Share2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto hover:scale-110 transition-transform"
                        onClick={() => handleBookmarkPost(selectedPost.id)}
                      >
                        <Bookmark className={`h-6 w-6 ${selectedPost.bookmarked ? 'fill-current text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                      </Button>
                    </div>
                    <span className="font-semibold text-blue-800 dark:text-blue-300">{selectedPost.likes} likes</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex items-center space-x-2">
                      <Input 
                        placeholder="Add a thoughtful comment..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        className="border-0 bg-gray-100 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500"
                      />
                      <Button 
                        size="sm"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MedicalGallery;
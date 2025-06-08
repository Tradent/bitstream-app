"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, MoreVertical, Flag, Reply } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { VideoComment } from "@/types/video"

interface CommentSectionProps {
  videoId: string
  initialComments: VideoComment[]
}

export function CommentSection({ videoId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<VideoComment[]>(initialComments)
  const [commentText, setCommentText] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "top">("top")
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set())
  const [dislikedComments, setDislikedComments] = useState<Set<string>>(new Set())

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentText.trim()) return

    // In a real app, you would call an API to add the comment
    const newComment: VideoComment = {
      id: `comment-${Date.now()}`,
      videoId,
      userId: "current-user",
      userName: "Current User",
      userAvatarUrl: "/placeholder.svg?key=5bmkc",
      content: commentText,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  const handleReplySubmit = (commentId: string) => {
    if (!replyText.trim()) return

    // In a real app, you would call an API to add the reply
    const newReply: VideoComment = {
      id: `reply-${Date.now()}`,
      videoId,
      userId: "current-user",
      userName: "Current User",
      userAvatarUrl: "/placeholder.svg?key=o5b6r",
      content: replyText,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyText("")
    setReplyingTo(null)
  }

  const handleLikeComment = (commentId: string) => {
    // Check if already liked or disliked
    const isLiked = likedComments.has(commentId)
    const isDisliked = dislikedComments.has(commentId)

    // Update liked/disliked sets
    const newLikedComments = new Set(likedComments)
    const newDislikedComments = new Set(dislikedComments)

    if (isLiked) {
      // Unlike
      newLikedComments.delete(commentId)
    } else {
      // Like and remove dislike if exists
      newLikedComments.add(commentId)
      if (isDisliked) {
        newDislikedComments.delete(commentId)
      }
    }

    setLikedComments(newLikedComments)
    setDislikedComments(newDislikedComments)

    // Update comment likes
    const updatedComments = updateCommentLikes(comments, commentId, isLiked ? -1 : 1, isDisliked ? 1 : 0)
    setComments(updatedComments)
  }

  const handleDislikeComment = (commentId: string) => {
    // Check if already liked or disliked
    const isLiked = likedComments.has(commentId)
    const isDisliked = dislikedComments.has(commentId)

    // Update liked/disliked sets
    const newLikedComments = new Set(likedComments)
    const newDislikedComments = new Set(dislikedComments)

    if (isDisliked) {
      // Remove dislike
      newDislikedComments.delete(commentId)
    } else {
      // Dislike and remove like if exists
      newDislikedComments.add(commentId)
      if (isLiked) {
        newLikedComments.delete(commentId)
      }
    }

    setLikedComments(newLikedComments)
    setDislikedComments(newDislikedComments)

    // Update comment likes
    const updatedComments = updateCommentLikes(comments, commentId, isLiked ? -1 : 0, isDisliked ? -1 : 1)
    setComments(updatedComments)
  }

  // Helper function to update comment likes
  const updateCommentLikes = (
    commentsList: VideoComment[],
    commentId: string,
    likeDelta: number,
    dislikeDelta: number,
  ): VideoComment[] => {
    return commentsList.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, likes: Math.max(0, comment.likes + likeDelta - dislikeDelta) }
      }

      // Check in replies if any
      if (comment.replies) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === commentId) {
            return { ...reply, likes: Math.max(0, reply.likes + likeDelta - dislikeDelta) }
          }
          return reply
        })

        return { ...comment, replies: updatedReplies }
      }

      return comment
    })
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return b.likes - a.likes
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-sky-900">{comments.length} Comments</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort by: {sortBy === "top" ? "Top comments" : "Newest first"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("top")}>Top comments</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest first</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?key=i9bw1" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="resize-none mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setCommentText("")}>
                Cancel
              </Button>
              <Button type="submit" disabled={!commentText.trim()} className="bg-teal-500 hover:bg-teal-600">
                Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    comment.userAvatarUrl ||
                    `/placeholder.svg?height=32&width=32&query=${encodeURIComponent(comment.userName) || "/placeholder.svg"}`
                  }
                />
                <AvatarFallback>{comment.userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sky-900">{comment.userName}</span>
                  <span className="text-xs text-sky-600">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sky-800 mb-2">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 px-2 ${likedComments.has(comment.id) ? "text-teal-600" : "text-sky-700"}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-6 px-2 ${dislikedComments.has(comment.id) ? "text-red-600" : "text-sky-700"}`}
                    onClick={() => handleDislikeComment(comment.id)}
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-sky-700"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    <span>Reply</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-sky-700">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="w-3 h-3 mr-2" /> Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-6">
                    <div className="flex gap-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?key=r8m2p" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder={`Reply to ${comment.userName}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="resize-none mb-2 text-sm"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyText("")
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            disabled={!replyText.trim()}
                            className="bg-teal-500 hover:bg-teal-600"
                            onClick={() => handleReplySubmit(comment.id)}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={
                              reply.userAvatarUrl ||
                              `/placeholder.svg?height=24&width=24&query=${encodeURIComponent(reply.userName) || "/placeholder.svg"}`
                            }
                          />
                          <AvatarFallback>{reply.userName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sky-900">{reply.userName}</span>
                            <span className="text-xs text-sky-600">
                              {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sky-800 mb-2">{reply.content}</p>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-5 px-1.5 text-xs ${
                                likedComments.has(reply.id) ? "text-teal-600" : "text-sky-700"
                              }`}
                              onClick={() => handleLikeComment(reply.id)}
                            >
                              <ThumbsUp className="w-2.5 h-2.5 mr-1" />
                              <span>{reply.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-5 px-1.5 text-xs ${
                                dislikedComments.has(reply.id) ? "text-red-600" : "text-sky-700"
                              }`}
                              onClick={() => handleDislikeComment(reply.id)}
                            >
                              <ThumbsDown className="w-2.5 h-2.5" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 px-1.5 text-xs text-sky-700">
                                  <MoreVertical className="w-2.5 h-2.5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Flag className="w-3 h-3 mr-2" /> Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

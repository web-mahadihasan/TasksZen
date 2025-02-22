import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, Mail } from "lucide-react"
import useAuth from "../../hooks/useAuth"

export default function Profile() {
  const navigate = useNavigate()
  const {user} = useAuth()

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl overflow-hidden">
        <CardHeader className="relative h-48 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={user?.photoURL} alt={user.name} />
              <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-20 pb-6 px-6">
          <div className="text-center mb-6">
            <CardTitle className="text-3xl font-bold mb-2">{user?.displayName}</CardTitle>
            <div className="flex items-center justify-center text-muted-foreground">
              <Mail className="w-4 h-4 mr-2" />
              {user.email}
            </div>
          </div>
          <div className="flex items-center justify-center text-muted-foreground mb-6">
            <CalendarDays className="w-4 h-4 mr-2" />
            Joined on {new Date(user?.metadata?.creationTime).toLocaleDateString()}
          </div>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => navigate("/activity")}>
              View Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import { useNavigate } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ActivityIcon } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecured from "../../hooks/useAxiosSecured"
import useAuth from "../../hooks/useAuth"
import LoadingPage from "../LoadingPage/LoadingPage"

export default function ActivityPage() {
  const navigate = useNavigate()
    const axiosSecured = useAxiosSecured()
    const {user} = useAuth()

  const {data: activities, isLoading} = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
        const {data} = await axiosSecured.get(`/activities/${user?.email}`)
        return data
    }
  })

  if(isLoading) <div><LoadingPage/></div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center">
            <ActivityIcon className="w-6 h-6 mr-2" />
            Activity Log
          </CardTitle>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities?.map((activity) => (
              <div key={activity._id} className="flex items-start space-x-4 shadow p-4 border">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


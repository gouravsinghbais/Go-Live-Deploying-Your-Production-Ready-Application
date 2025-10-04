"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

type Task = {
  id: string
  title: string
  description?: string
  is_complete: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from<Task>("tasks")
        .select("*")
        .order("inserted_at", { ascending: false })

      if (error) {
        console.error("Error fetching tasks:", error)
        setTasks([])
      } else {
        setTasks(data)
      }
      setLoading(false)
    }

    fetch()

    // optional: subscribe to real-time changes (advanced)
    // const sub = supabase.from('tasks').on('*', payload => { ... }).subscribe()
    // return () => supabase.removeSubscription(sub)
  }, [])

  if (loading) return <p>Loading tasks…</p>

  return (
    <main style={{ padding: 20 }}>
      <h1>Tasks</h1>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((t) => (
            <li key={t.id}>
              <strong>{t.title}</strong> {t.is_complete ? "✅" : ""}
              <div>{t.description}</div>
            </li>
          ))
        ) : (
          <li>No tasks yet</li>
        )}
      </ul>
    </main>
  )
}
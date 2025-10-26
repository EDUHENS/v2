import { useState, useMemo } from 'react'
import './App.css'
import Auth0Mock from './components/Auth0Mock'
import DashboardSelection from './components/DashboardSelection'
import MainLayout from './components/layouts/MainLayout'
import Layout1 from './components/layouts/Layout1'
import Layout2 from './components/layouts/Layout2'
import ClosedTaskReview from './components/ClosedTaskReview'
import Header from './components/Header'
import { Task } from './components/Sidebar'
import AInputBox from './components/AInputBox'
import TaskCreationForm, { TaskFormData } from './components/TaskCreationForm'
import StudentSubmissions from './components/StudentSubmissions'
import PreviewModal from './components/PreviewModal'
import DraftSavedModal from './components/DraftSavedModal'
import TaskScheduleModal from './components/TaskScheduleModal'
import TaskPublishedModal from './components/TaskPublishedModal'
import TaskReadyToPublishModal from './components/TaskReadyToPublishModal'
import SubmissionDetailsModal from './components/SubmissionDetailsModal'
import BottomInputBar from './components/BottomInputBar'
import OngoingTasks from './components/OngoingTasks'

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{name: string, email: string} | null>(null)
  
  // Dashboard state
  const [showDashboardSelection, setShowDashboardSelection] = useState(false)
  const [selectedDashboard, setSelectedDashboard] = useState<'educator' | 'student' | null>(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [taskInput, setTaskInput] = useState('')
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [currentTaskPrompt, setCurrentTaskPrompt] = useState('')
  const [currentSelectedTask, setCurrentSelectedTask] = useState<Task | null>(null)
  const [showingLayout3, setShowingLayout3] = useState(false)
  const [isGeneratingTask, setIsGeneratingTask] = useState(false)
  
  // Modal states
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDraftSavedModal, setShowDraftSavedModal] = useState(false)
  const [showTaskScheduleModal, setShowTaskScheduleModal] = useState(false)
  const [showTaskPublishedModal, setShowTaskPublishedModal] = useState(false)
  const [showTaskReadyToPublishModal, setShowTaskReadyToPublishModal] = useState(false)
  const [showSubmissionDetailsModal, setShowSubmissionDetailsModal] = useState(false)
  
  // Educator submission and grade approval state
  const [educatorSubmissions, setEducatorSubmissions] = useState<{[key: number]: {grade: string, feedback: string, submittedAt: Date}}>({})
  const [approvedGrades, setApprovedGrades] = useState<{[key: number]: boolean}>({})
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null)
  
  // Task schedule state
  const [taskSchedule, setTaskSchedule] = useState<{
    startDate: Date | null;
    endDate: Date | null;
    startTime?: string;
    endTime?: string;
  }>({
    startDate: null,
    endDate: null
  })
  
  // Draft tasks state
  const [draftTasks, setDraftTasks] = useState<Task[]>([])
  
  // Task form data
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    title: 'Building RESTful APIs with Node.js and Express: A Comprehensive Backend Development Project',
    objective: 'By the end of this task, you will be able to design, implement, and deploy a complete RESTful API using Node.js and Express.js.',
    steps: ['Set up your development environment', 'Initialize a new Node.js project'],
    expectedOutputs: ['A fully functional RESTful API', 'Complete source code repository'],
    duration: '2-3 weeks (15-20 hours total)',
    resources: ['Node.js Official Documentation', 'Express.js Guide'],
    reflectionQuestions: ['What was the most challenging aspect?'],
    assessmentCriteria: ['API Functionality', 'Code Quality'],
    rubric: [],
    levelOfTask: 'Intermediate',
    supportHints: ['Start with simple endpoints'],
    academicIntegrity: 'This project must be your original work.',
    gradingSystem: 'passfail'
  })

  // Mock tasks data
  const allTasks: Task[] = [
    {
      id: 1,
      title: "Understanding and Applying React Props in Component-Based Development",
      dueDate: 1,
      submissions: 32,
      timeLeft: "1day 12hours",
      clarityScore: 5
    },
    {
      id: 2,
      title: "Mastering Asynchronous JavaScript with Async/Await",
      dueDate: 3,
      submissions: 28,
      timeLeft: "3days 5hours",
      clarityScore: 4
    },
    {
      id: 3,
      title: "Deep Dive into State Management with Redux",
      dueDate: 5,
      submissions: 15,
      timeLeft: "5days 2hours",
      clarityScore: 3
    },
    {
      id: 4,
      title: "Exploring the Benefits of TypeScript with React",
      dueDate: 7,
      submissions: 42,
      timeLeft: "7days 8hours",
      clarityScore: 5
    },
    {
      id: 5,
      title: "Implementing Custom Hooks for Better Code Reusability",
      dueDate: 0,
      submissions: 18,
      timeLeft: "12hours",
      clarityScore: 4
    },
    {
      id: 6,
      title: "Performance Optimization Techniques for React Apps",
      dueDate: -2,
      submissions: 25,
      timeLeft: "Overdue",
      clarityScore: 2
    },
    {
      id: 7,
      title: "Building Responsive Layouts with React and CSS Grid",
      dueDate: -1,
      submissions: 30,
      timeLeft: "Overdue",
      clarityScore: 3
    }
  ]

  // Combine regular tasks with draft tasks
  const tasks = [...allTasks, ...draftTasks]

  // Generate 31 mock submissions for testing pagination - memoized to prevent regeneration on every render
  const mockSubmissions = useMemo(() => {
    const names = [
      "James Rodriguez", "Hang Nguyen", "Emma Johnson", "Sofia Laaksonen", "Liam Smith",
      "Aino Korhonen", "Marcus Chen", "Isabella Garcia", "Oliver Thompson", "Zara Ahmed",
      "Erik Johansson", "Maya Patel", "Alex Kim", "Sophie Martin", "David Wilson",
      "Luna Rodriguez", "Noah Anderson", "Ava Brown", "Lucas Miller", "Chloe Davis",
      "William Taylor", "Grace Lee", "Henry White", "Mia Harris", "Jack Clark",
      "Ella Lewis", "Benjamin Walker", "Charlotte Hall", "Samuel Young", "Amelia King",
      "Thomas Anderson"
    ];
    
    const statuses = ["pending", "approved", "needs_revision"] as const;
    const assessments = ["pass", "fail"] as const;
    
    return names.map((name, index) => ({
      id: index + 1,
      studentName: name,
      submissionDate: `2025-11-${String(index + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      aiAssessment: {
        overall: assessments[Math.floor(Math.random() * assessments.length)],
        details: [
          "Component implementation shows good understanding of React principles.",
          "Props are being used effectively for component communication.",
          "Code structure is well-organized and documented."
        ]
      },
      attachments: [
        { type: "pdf" as const, name: `Submission_${name.replace(' ', '_')}.pdf`, size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB` },
        { type: "github" as const, name: `project-${name.toLowerCase().replace(' ', '-')}.github`, size: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB` }
      ],
      studentNote: `This is submission ${index + 1} for testing pagination functionality. The project demonstrates understanding of React component architecture and prop usage.`
    }));
  }, []);

  // Handle authentication
  const handleLogin = () => {
    setUser({ name: 'Dr. Sarah Johnson', email: 'sarah@eduhens.com' })
    setIsAuthenticated(true)
    setShowDashboardSelection(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setSelectedDashboard(null)
    setShowDashboardSelection(false)
  }

  const handleDashboardSelect = (type: 'educator' | 'student') => {
    setSelectedDashboard(type)
    setShowDashboardSelection(false)
  }

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task.title, 'dueDate:', task.dueDate, 'isDraft:', task.isDraft)
    if (task.isDraft) {
      console.log('Setting draft task - going to task creation')
      setCurrentSelectedTask(task)
      setIsCreatingTask(true)
      setShowingLayout3(false)
    } else {
      if (task.dueDate >= 0) {
        console.log('Setting ongoing task - going to Layout 3')
        setCurrentSelectedTask(task)
        setShowingLayout3(true)
        setIsCreatingTask(false)
      } else {
        console.log('Setting closed task - going to Layout 3 for review')
        setCurrentSelectedTask(task)
        setShowingLayout3(true)
        setIsCreatingTask(false)
      }
    }
  }

  const handlePublishTask = (data: TaskFormData) => {
    console.log('Publishing task:', data)
    setShowTaskReadyToPublishModal(true)
  }

  const handleModifyTask = (message: string) => {
    console.log('Modifying task:', message)
  }

  const handleSaveDraft = async () => {
    try {
      const existingDraftIndex = draftTasks.findIndex(task => task.isDraft)
      const existingDraftId = existingDraftIndex >= 0 ? draftTasks[existingDraftIndex].id : undefined
      
      const updatedDraftTask: Task = {
        id: existingDraftId || Date.now(),
        title: taskFormData.title || 'Untitled Task',
        dueDate: 7,
        submissions: 0,
        timeLeft: '7 days',
        clarityScore: 0,
        isDraft: true,
        formData: taskFormData
      }
      
      if (existingDraftIndex >= 0) {
        setDraftTasks(prev => prev.map((task, index) => 
          index === existingDraftIndex ? updatedDraftTask : task
        ))
      } else {
        setDraftTasks(prev => [...prev, updatedDraftTask])
      }
      
      setShowDraftSavedModal(true)
    } catch (error) {
      console.error('Error saving draft:', error)
    }
  }

  const handleTaskSchedule = () => {
    setShowTaskScheduleModal(true)
  }

  // Generate mock schedule dates for ongoing tasks based on due date
  const generateMockSchedule = (dueDate: number) => {
    if (dueDate < 0) return { startDate: null, endDate: null }; // Closed tasks
    
    const now = new Date();
    const endDate = new Date(now.getTime() + (dueDate * 24 * 60 * 60 * 1000)); // Due date
    const startDate = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days before due
    
    return { startDate, endDate };
  };

  const handleScheduleSave = (startDate: Date | null, endDate: Date | null, startTime?: string, endTime?: string) => {
    setTaskSchedule({ startDate, endDate, startTime, endTime })
  }

  const handleEducatorSubmission = () => {
    // No longer needed - assessment is handled in SubmissionDetailsModal
  }

  const handleSubmitGrade = (grade: number | string, feedback: string) => {
    console.log('Grade submitted:', grade, 'Feedback:', feedback)
    
    // Store the educator submission using the selected submission ID
    const submissionId = selectedSubmissionId || 1 // Use selected submission ID or default to 1
    setEducatorSubmissions(prev => ({
      ...prev,
      [submissionId]: {
        grade: grade.toString(),
        feedback: feedback,
        submittedAt: new Date()
      }
    }))
    
    // Grade submitted successfully
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Auth0Mock onLogin={handleLogin} />
  }

  // Show dashboard selection if no dashboard selected
  if (showDashboardSelection) {
    return <DashboardSelection onSelect={handleDashboardSelect} />
  }

  // Show educator dashboard
  if (selectedDashboard === 'educator') {
    console.log('Rendering educator dashboard - showingLayout3:', showingLayout3, 'isCreatingTask:', isCreatingTask)
    return (
      <>
        <MainLayout
          mainDashboard={
            showingLayout3 ? (
              currentSelectedTask && currentSelectedTask.dueDate < 0 ? (
                // Closed task - show ClosedTaskReview
                <ClosedTaskReview
                  task={currentSelectedTask}
                  submissions={mockSubmissions.map(sub => ({
                    id: sub.id,
                    name: sub.studentName,
                    status: sub.status,
                    date: sub.submissionDate,
                    studentName: sub.studentName,
                    educatorAssessment: 'Pending',
                    dateTime: sub.submissionDate,
                    hensAssessment: sub.aiAssessment.overall as 'pass' | 'fail'
                  }))}
                  onSubmissionClick={(submission) => {
                    // For closed tasks, don't open modal - details are shown in right frame
                    // Just update the selected submission ID for any potential future use
                    setSelectedSubmissionId(submission.id)
                  }}
                  educatorSubmissions={educatorSubmissions}
                  approvedGrades={approvedGrades}
                  onEducatorSubmission={(grade, feedback) => {
                    const submissionId = selectedSubmissionId || 1;
                    setEducatorSubmissions(prev => ({
                      ...prev,
                      [submissionId]: {
                        grade,
                        feedback,
                        submittedAt: new Date()
                      }
                    }));
                  }}
                  onApproveGrade={() => {
                    console.log('Closed task approved and graded!')
                    
                    // Mark the grade as approved using the selected submission ID
                    const submissionId = selectedSubmissionId || 1
                    setApprovedGrades(prev => ({
                      ...prev,
                      [submissionId]: true
                    }))
                  }}
                />
              ) : (
                // Ongoing task - show OngoingTasks
                <OngoingTasks
                  taskTitle={currentSelectedTask?.title || 'Task'}
                  submissions={mockSubmissions.map(sub => ({
                    id: sub.id,
                    name: sub.studentName,
                    status: sub.status,
                    date: sub.submissionDate,
                    studentName: sub.studentName,
                    educatorAssessment: 'Pending',
                    dateTime: sub.submissionDate,
                    hensAssessment: sub.aiAssessment.overall as 'pass' | 'fail'
                  }))}
                  taskFormData={currentSelectedTask?.formData || taskFormData}
                  onTaskFormChange={setTaskFormData}
                  onPublishTask={handlePublishTask}
                  onModifyTask={handleModifyTask}
                  scheduledStart={generateMockSchedule(currentSelectedTask?.dueDate || 0).startDate}
                  scheduledEnd={generateMockSchedule(currentSelectedTask?.dueDate || 0).endDate}
                  onPreview={() => setShowPreviewModal(true)}
                  onSaveDraft={handleSaveDraft}
                  onTaskSchedule={handleTaskSchedule}
                  onSubmissionClick={(submission) => {
                    setSelectedSubmissionId(submission.id)
                    setShowSubmissionDetailsModal(true)
                  }}
                  educatorSubmissions={educatorSubmissions}
                  approvedGrades={approvedGrades}
                />
              )
            ) : isCreatingTask ? (
              <Layout2
                header={
                  <Header
                    title="Task Lab"
                    subtitle="Create New Task"
                    taskTitle={taskFormData.title}
                    scheduledStart={taskSchedule.startDate}
                    scheduledEnd={taskSchedule.endDate}
                    actions={
                      <>
                        <button 
                          onClick={() => setShowPreviewModal(true)}
                          className="bg-white border border-[#cccccc] border-solid box-border content-stretch flex gap-[7px] items-center justify-center max-w-[160px] overflow-visible px-[16px] py-[12px] relative rounded-[4px] shrink-0 w-[160px] hover:bg-gray-50 hover:border-[#999999] transition-colors cursor-pointer">
                          <svg className="w-3 h-3" fill="none" stroke="#595959" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="font-['Helvetica_Neue:Regular', sans-serif] leading-[normal] not-italic relative shrink-0 text-[#595959] text-[14px] text-nowrap whitespace-pre">
                            Preview
                          </span>
                        </button>
                        <button 
                          onClick={handleSaveDraft}
                          className="bg-white border border-[#cccccc] border-solid box-border content-stretch flex gap-[8px] items-center justify-center max-w-[160px] overflow-visible px-[16px] py-[12px] relative rounded-[4px] shrink-0 w-[160px] hover:bg-gray-50 hover:border-[#999999] transition-colors cursor-pointer">
                          <svg className="w-3 h-3" fill="none" stroke="#595959" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="font-['Helvetica_Neue:Regular', sans-serif] leading-[normal] not-italic relative shrink-0 text-[#595959] text-[14px] text-nowrap whitespace-pre">
                            Save Draft
                          </span>
                        </button>
                        <button 
                          onClick={handleTaskSchedule}
                          className="bg-white border border-[#cccccc] border-solid box-border content-stretch flex gap-[7px] items-center justify-center max-w-[180px] overflow-visible px-[16px] py-[12px] relative rounded-[4px] shrink-0 w-[180px] hover:bg-gray-50 hover:border-[#999999] transition-colors cursor-pointer">
                          <svg className="w-3 h-3" fill="none" stroke="#595959" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-['Helvetica_Neue:Regular', sans-serif] leading-[normal] not-italic relative shrink-0 text-[#595959] text-[14px] text-nowrap whitespace-pre">
                            Task Schedule
                          </span>
                        </button>
                      </>
                    }
                  />
                }
              >
                {isGeneratingTask ? (
                  <div className="p-6 h-full">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered Task Generation</h2>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-blue-900 mb-2">Your Task Prompt:</h3>
                        <p className="text-blue-800">"{currentTaskPrompt}"</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">AI is analyzing your request...</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-700">Understanding learning objectives</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <span className="text-gray-700">Generating task structure</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <span className="text-gray-700">Creating assessment criteria</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                            <span className="text-gray-700">Finalizing task details</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <TaskCreationForm
                    data={taskFormData}
                    onChange={setTaskFormData}
                    onSubmit={() => {}}
                    onPublish={handlePublishTask}
                    onModify={handleModifyTask}
                    isLoading={isGeneratingTask}
                  />
                )}
              </Layout2>
            ) : (
              <Layout1>
                <div className="content-stretch flex flex-col items-center justify-center p-[24px] relative size-full">
                  <div className="content-stretch flex gap-[16px] items-end justify-center relative shrink-0 mb-[96px]">
                    <div className="h-[72px] relative shrink-0 w-[64px]">
                      <img src="/hens-main.svg" alt="Hens" className="w-full h-full" />
                    </div>
                    <p className="font-['Nunito_Sans:Bold_Italic', sans-serif] font-bold italic leading-normal relative shrink-0 text-[#484de6] text-[24px] text-center text-nowrap tracking-[0.48px] whitespace-pre">
                      Hens can turn words into comprehensive tasks
                    </p>
                  </div>

                  <AInputBox
                    value={taskInput}
                    onChange={setTaskInput}
                    onSubmit={() => {
                      if (taskInput.trim()) {
                        setCurrentTaskPrompt(taskInput.trim())
                        setIsCreatingTask(true)
                        setTaskInput('')
                      }
                    }}
                    placeholder="Describe your task shortly"
                    maxWidth="900px"
                  />

                  <div className="content-stretch flex flex-col items-center relative shrink-0 mt-[24px]">
                    <div className="font-['Helvetica_Neue:Regular', sans-serif] leading-0 not-italic relative shrink-0 text-[#222222] text-[0px] text-center text-nowrap tracking-[0.32px] whitespace-pre">
                      <p className="leading-normal mb-0 text-[16px]">
                        The more detailed description, as precise the result.
                      </p>
                      <p className="leading-normal text-[16px]">
                        Even a simple start like; "<span className="font-['Helvetica_Neue:Medium_Italic', sans-serif] italic">I want my learners to understand [topic]</span>" is enough.
                      </p>
                    </div>
                  </div>
                </div>
              </Layout1>
            )
          }
          isMinimized={isSidebarMinimized}
          onToggleMinimize={() => setIsSidebarMinimized(!isSidebarMinimized)}
          tasks={tasks}
          onTaskClick={handleTaskClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogoClick={() => {
            setIsCreatingTask(false)
            setShowingLayout3(false)
          }}
          userProfile={{ name: user?.name || 'User' }}
        />

        {/* All Modals */}
        <PreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          taskData={taskFormData}
          onPublish={() => {
            setShowPreviewModal(false)
            setShowTaskReadyToPublishModal(true)
          }}
        />

        <DraftSavedModal
          isOpen={showDraftSavedModal}
          onClose={() => setShowDraftSavedModal(false)}
          onKeepEditing={() => setShowDraftSavedModal(false)}
          onStartAnother={() => {
            setShowDraftSavedModal(false)
            setTaskFormData({
              title: '',
              objective: '',
              steps: [''],
              expectedOutputs: [''],
              duration: '',
              resources: [''],
              reflectionQuestions: [''],
              assessmentCriteria: [''],
              rubric: [],
              levelOfTask: '',
              supportHints: [''],
              academicIntegrity: '',
              gradingSystem: 'passfail'
            })
            setIsCreatingTask(false)
            setCurrentTaskPrompt('')
          }}
        />

        <TaskScheduleModal
          isOpen={showTaskScheduleModal}
          onClose={() => setShowTaskScheduleModal(false)}
          onSave={handleScheduleSave}
        />

        <TaskPublishedModal
          isOpen={showTaskPublishedModal}
          onClose={() => {
            setShowTaskPublishedModal(false)
            setIsCreatingTask(false)
            setShowingLayout3(false)
            setTaskSchedule({ startDate: null, endDate: null })
          }}
          taskTitle={taskFormData.title}
          scheduledStart={taskSchedule.startDate}
          scheduledEnd={taskSchedule.endDate}
        />



        <TaskReadyToPublishModal
          isOpen={showTaskReadyToPublishModal}
          onClose={() => setShowTaskReadyToPublishModal(false)}
          taskSchedule={
            taskSchedule.startDate && taskSchedule.endDate
              ? `${taskSchedule.startDate.toLocaleDateString('en-GB').replace(/\//g, '.')} - ${taskSchedule.endDate.toLocaleDateString('en-GB').replace(/\//g, '.')} / ${taskSchedule.startDate.getFullYear()}`
              : undefined
          }
          onPublish={() => {
            console.log('Task published from ready modal!')
            setShowTaskReadyToPublishModal(false)
            setShowTaskPublishedModal(true)
          }}
        />

        <SubmissionDetailsModal
          isOpen={showSubmissionDetailsModal}
          onClose={() => setShowSubmissionDetailsModal(false)}
          onApproveGrade={() => {
            console.log('Task approved and graded!')
            const submissionId = selectedSubmissionId || 1
            setApprovedGrades(prev => ({
              ...prev,
              [submissionId]: true
            }))
            setShowSubmissionDetailsModal(false)
          }}
          onEducatorSubmission={handleEducatorSubmission}
          educatorSubmission={educatorSubmissions[selectedSubmissionId || 1]}
          isGradeApproved={approvedGrades[selectedSubmissionId || 1]}
          selectedSubmission={selectedSubmissionId ? mockSubmissions.find(sub => sub.id === selectedSubmissionId) : null}
        />
      </>
    )
  }

  // Show student dashboard
  return (
    <MainLayout
      mainDashboard={
        <Layout1>
          <div className="flex flex-col items-center gap-16">
            <div className="flex items-end gap-4">
              <div className="w-16 h-18">
                <img src="/hens-main.svg" alt="Hens" className="w-full h-full" />
              </div>
              <p className="text-[#F15A24] text-2xl font-bold italic leading-normal tracking-[0.48px] text-center">
                Hens can turn words into comprehensive tasks
              </p>
            </div>

            <div className="bg-white border-2 border-[#222222] rounded w-[900px] max-h-[300px]">
              <div className="flex items-center gap-5 p-6">
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-gray-300 rounded"></div>
                  <input
                    type="text"
                    placeholder="Describe your task shortly"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className="flex-1 text-[#666666] text-base placeholder-[#666666] outline-none"
                  />
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded rotate-90"></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[#222222] text-base leading-normal tracking-[0.32px]">
                <span>The more detailed description, </span>
                <span>as precise the result. </span>
              </p>
              <p className="text-[#222222] text-base leading-normal">
                Even a simple start like; "
                <span className="font-medium italic">I want my learners to understand [topic]</span>
                " is enough.
              </p>
            </div>
          </div>
        </Layout1>
      }
      isMinimized={isSidebarMinimized}
      onToggleMinimize={() => setIsSidebarMinimized(!isSidebarMinimized)}
      tasks={tasks}
      onTaskClick={handleTaskClick}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onLogoClick={() => {}}
      userProfile={{ name: user?.name || 'User' }}
    />
  )
}

export default App

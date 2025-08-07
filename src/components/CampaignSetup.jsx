import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Clock,
  MessageSquare,
  Users,
  Settings,
  Globe,
  Calendar,
  Mail,
  Zap,
  Target,
  Heart,
} from "lucide-react";

const CampaignSetup = ({ campaignName, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [setupMode, setSetupMode] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: campaignName,
    description: "",
    timezone: "UTC",
    conversationFlow: [
      {
        id: 1,
        type: "message",
        message: "",
        description: "",
      },
    ],
    followUpDuration: 3,
    inboxCheckerFrequency: 45,
    connectionCheckerFrequency: 60,
    maxConnectionsPerDay: 50,
    maxMessagesPerDay: 100,
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
    daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  });

  const templates = [
    {
      id: "standard-outreach",
      name: "Standard Outreach",
      description: "Balanced, safe, and effective approach for most prospects",
      icon: Target,
      features: [
        "1 connection request",
        "2 follow-up messages",
        "1 connection per day",
      ],
      config: {
        title: "Standard Outreach Campaign",
        description: "Professional outreach with balanced follow-up sequence",
        timezone: "UTC",
        conversationFlow: [
          {
            id: 1,
            type: "message",
            description: "Initial outreach",
            message:
              "Hi {{firstName}}, I noticed we both work in {{industry}} and I'd love to connect!",
          },
          {
            id: 2,
            type: "message",
            description: "Follow-up after connection",
            message:
              "Thanks for connecting! I'd love to learn more about your work in {{industry}}. Would you be open to a quick chat?",
          },
          {
            id: 3,
            type: "message",
            description: "Final follow-up",
            message:
              "Just wanted to follow up on my previous message. I'm really interested in learning about your experience in {{industry}}.",
          },
        ],
        followUpDuration: 7,
        inboxCheckerFrequency: 45,
        connectionCheckerFrequency: 60,
        maxConnectionsPerDay: 25,
        maxMessagesPerDay: 50,
        workingHours: { start: "09:00", end: "17:00" },
        daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
    {
      id: "aggressive-followup",
      name: "Aggressive Follow-up",
      description:
        "Fast, persistent approach for hot leads and urgent opportunities",
      icon: Zap,
      features: [
        "1 connection request",
        "4 follow-up messages",
        "2 connections per day",
      ],
      config: {
        title: "Aggressive Follow-up Campaign",
        description: "High-frequency outreach for time-sensitive opportunities",
        timezone: "UTC",
        conversationFlow: [
          {
            id: 1,
            type: "message",
            description: "Urgent opportunity outreach",
            message:
              "Hi {{firstName}}, I have an urgent opportunity in {{industry}} that I think would be perfect for you. Let's connect!",
          },
          {
            id: 2,
            type: "message",
            description: "Immediate follow-up",
            message:
              "Thanks for connecting! This opportunity is time-sensitive. Can we hop on a quick call today or tomorrow?",
          },
          {
            id: 3,
            type: "message",
            description: "Urgent follow-up",
            message:
              "Following up on the urgent opportunity I mentioned. Still available for a 15-minute call?",
          },
          {
            id: 4,
            type: "message",
            description: "Final chance",
            message:
              "Last chance to discuss this opportunity. It's closing soon - are you interested?",
          },
          {
            id: 5,
            type: "message",
            description: "Closing message",
            message:
              "Final follow-up on this opportunity. If you're not interested, no worries - just let me know!",
          },
        ],
        followUpDuration: 5,
        inboxCheckerFrequency: 30,
        connectionCheckerFrequency: 45,
        maxConnectionsPerDay: 50,
        maxMessagesPerDay: 100,
        workingHours: { start: "08:00", end: "18:00" },
        daysOfWeek: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
      },
    },
    {
      id: "soft-touch",
      name: "Soft Touch",
      description:
        "Gentle, spaced out approach for cold prospects and relationship building",
      icon: Heart,
      features: [
        "1 connection request",
        "1 follow-up message",
        "1 connection per week",
      ],
      config: {
        title: "Soft Touch Campaign",
        description:
          "Gentle outreach focused on relationship building over time",
        timezone: "UTC",
        conversationFlow: [
          {
            id: 1,
            type: "message",
            description: "Gentle initial outreach",
            message:
              "Hi {{firstName}}, I came across your profile and was impressed by your work in {{industry}}. Would love to connect!",
          },
          {
            id: 2,
            type: "message",
            description: "Relationship building follow-up",
            message:
              "Thanks for connecting! I'm always interested in learning from other professionals in {{industry}}. Maybe we can share insights sometime?",
          },
        ],
        followUpDuration: 14,
        inboxCheckerFrequency: 60,
        connectionCheckerFrequency: 90,
        maxConnectionsPerDay: 10,
        maxMessagesPerDay: 20,
        workingHours: { start: "10:00", end: "16:00" },
        daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
  ];

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
  ];

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addConversationStep = () => {
    const newStep = {
      id: Date.now(),
      type: "message",
      message: "",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      conversationFlow: [...prev.conversationFlow, newStep],
    }));
  };

  const updateConversationStep = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      conversationFlow: prev.conversationFlow.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    }));
  };

  const removeConversationStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      conversationFlow: prev.conversationFlow.filter((_, i) => i !== index),
    }));
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData(template.config);
    setStep(2); // Skip to conversation flow since template has defaults
  };

  const handleComplete = () => {
    onComplete("linkedin-automation", formData);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Setup Method
        </h2>
        <p className="text-gray-600">
          How would you like to set up your campaign?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Scratch Option */}
        <div
          onClick={() => {
            setSetupMode("scratch");
            setStep(2);
          }}
          className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                From Scratch
              </h3>
              <p className="text-gray-600 mb-4">
                Build your campaign completely from the ground up with full
                control over every setting
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Complete customization
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Define every detail
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Advanced control
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Template-Based Option */}
        <div
          onClick={() => setSetupMode("template")}
          className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Use a Template
              </h3>
              <p className="text-gray-600 mb-4">
                Choose from proven campaign templates and customize as needed
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Quick setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Proven strategies
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Easy customization
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplateSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose a Template
        </h2>
        <p className="text-gray-600">
          Select a template that matches your outreach strategy
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-2">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Campaign Basics
        </h2>
        <p className="text-gray-600">
          Set up the foundation of your LinkedIn automation campaign
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter campaign title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Describe your campaign goals and target audience..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={formData.timezone}
            onChange={(e) => updateFormData("timezone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Conversation Flow
        </h2>
        <p className="text-gray-600">
          Define the sequence of messages and interactions
        </p>
      </div>

      <div className="space-y-4">
        {formData.conversationFlow.map((step, index) => (
          <div key={step.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Step {index + 1}: Message
              </h3>
              {index > 0 && (
                <button
                  onClick={() => removeConversationStep(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={step.description || ""}
                  onChange={(e) =>
                    updateConversationStep(index, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this message..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={step.message}
                  onChange={(e) =>
                    updateConversationStep(index, "message", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter your message..."
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addConversationStep}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
        >
          + Add Message Step
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Timing & Frequency
        </h2>
        <p className="text-gray-600">
          Configure when and how often your campaign runs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Follow-up Duration (days)
          </label>
          <input
            type="number"
            value={formData.followUpDuration}
            onChange={(e) =>
              updateFormData("followUpDuration", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inbox Checker Frequency (minutes)
          </label>
          <input
            type="number"
            value={formData.inboxCheckerFrequency}
            onChange={(e) =>
              updateFormData("inboxCheckerFrequency", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="15"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Connection Checker Frequency (minutes)
          </label>
          <input
            type="number"
            value={formData.connectionCheckerFrequency}
            onChange={(e) =>
              updateFormData(
                "connectionCheckerFrequency",
                parseInt(e.target.value)
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="30"
            max="180"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Connections Per Day
          </label>
          <input
            type="number"
            value={formData.maxConnectionsPerDay}
            onChange={(e) =>
              updateFormData("maxConnectionsPerDay", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Messages Per Day
          </label>
          <input
            type="number"
            value={formData.maxMessagesPerDay}
            onChange={(e) =>
              updateFormData("maxMessagesPerDay", parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="200"
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Working Hours
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={formData.workingHours.start}
              onChange={(e) =>
                updateFormData("workingHours", {
                  ...formData.workingHours,
                  start: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={formData.workingHours.end}
              onChange={(e) =>
                updateFormData("workingHours", {
                  ...formData.workingHours,
                  end: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Working Days
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {daysOfWeek.map((day) => (
            <label key={day.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.daysOfWeek.includes(day.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData("daysOfWeek", [
                      ...formData.daysOfWeek,
                      day.value,
                    ]);
                  } else {
                    updateFormData(
                      "daysOfWeek",
                      formData.daysOfWeek.filter((d) => d !== day.value)
                    );
                  }
                }}
                className="rounded"
              />
              <span className="text-sm text-gray-700">{day.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review & Launch
        </h2>
        <p className="text-gray-600">
          Review your campaign settings before launching
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Campaign Details</h3>
          <p>
            <strong>Title:</strong> {formData.title}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {formData.description || "No description"}
          </p>
          <p>
            <strong>Timezone:</strong> {formData.timezone}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Conversation Flow
          </h3>
          <p>
            <strong>Steps:</strong> {formData.conversationFlow.length}
          </p>
          <p>
            <strong>First Message:</strong>{" "}
            {formData.conversationFlow[0]?.message.substring(0, 50)}...
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Timing Settings</h3>
          <p>
            <strong>Follow-up Duration:</strong> {formData.followUpDuration}{" "}
            days
          </p>
          <p>
            <strong>Inbox Checker:</strong> Every{" "}
            {formData.inboxCheckerFrequency} minutes
          </p>
          <p>
            <strong>Connection Checker:</strong> Every{" "}
            {formData.connectionCheckerFrequency} minutes
          </p>
          <p>
            <strong>Max Connections/Day:</strong>{" "}
            {formData.maxConnectionsPerDay}
          </p>
          <p>
            <strong>Max Messages/Day:</strong> {formData.maxMessagesPerDay}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Working Hours</h3>
          <p>
            <strong>Hours:</strong> {formData.workingHours.start} -{" "}
            {formData.workingHours.end}
          </p>
          <p>
            <strong>Days:</strong>{" "}
            {formData.daysOfWeek
              .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (step === 1 && !setupMode) {
      return renderStep1();
    }

    if (step === 1 && setupMode === "template") {
      return renderTemplateSelection();
    }

    const actualStep = setupMode === "template" ? step : step - 1;

    switch (actualStep) {
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      case 3:
        return renderStep4();
      case 4:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  const getTotalSteps = () => {
    if (!setupMode) return 2; // Initial selection + actual steps
    if (setupMode === "template") return 4; // template selection + 3 steps
    if (setupMode === "scratch") return 4; // from scratch: 4 steps
    return 4; // default
  };

  const getCurrentStep = () => {
    if (!setupMode) return 0; // No progress yet: choosing method
    if (setupMode === "template") return step;
    if (setupMode === "scratch") return step - 1;
    return step - 1;
  };

  const canProceed = () => {
    if (step === 1 && !setupMode) {
      return false; // No next button on initial selection
    }

    if (step === 1 && setupMode === "template") {
      return selectedTemplate !== null;
    }

    if (step === 1 && setupMode === "scratch") {
      return true; // Can proceed to next step
    }

    const actualStep = setupMode === "template" ? step : step - 1;

    switch (actualStep) {
      case 1:
        return formData.title.trim() !== "";
      case 2:
        return (
          formData.conversationFlow.length > 0 &&
          formData.conversationFlow.every((step) => step.message.trim() !== "")
        );
      case 3:
        return true; // All fields have defaults
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step === 1 && !setupMode) {
      // User selected setup mode, move to next step
      setStep(2);
    } else if (step === 1 && setupMode === "template" && selectedTemplate) {
      // Template selected, move to conversation flow
      setStep(2);
    } else if (step === 1 && setupMode === "scratch") {
      // From scratch selected, move to campaign basics
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step === 2 && setupMode === "template") {
      // Go back to template selection
      setStep(1);
    } else {
      setStep(Math.max(1, step - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {getCurrentStep()} of {getTotalSteps()}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((getCurrentStep() / getTotalSteps()) * 100)}%
                Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(getCurrentStep() / getTotalSteps()) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={step === 1 && !setupMode}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>

              {getCurrentStep() < getTotalSteps() && setupMode ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : getCurrentStep() >= getTotalSteps() ? (
                <button
                  onClick={handleComplete}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <span>Launch Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSetup;

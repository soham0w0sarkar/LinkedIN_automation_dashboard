import { useState } from "react";
import { Modal } from "./index";

const AssignTargetsModal = ({ bots, targetLinks, onClose, handleSave }) => {
  const [assignments, setAssignments] = useState({});

  const isTargetUsed = (targetIndex, currentBotId) => {
    return Object.entries(assignments).some(
      ([botId, targetIndices]) =>
        botId !== currentBotId && targetIndices.includes(targetIndex)
    );
  };

  const handleTargetToggle = (botId, targetIndex) => {
    setAssignments((prev) => {
      const newAssignments = { ...prev };

      const currentBotTargets = newAssignments[botId] || [];

      const isCurrentlyAssigned = currentBotTargets.includes(targetIndex);

      if (isCurrentlyAssigned) {
        newAssignments[botId] = currentBotTargets.filter(
          (index) => index !== targetIndex
        );
      } else {
        Object.keys(newAssignments).forEach((otherBotId) => {
          if (otherBotId !== botId && newAssignments[otherBotId]) {
            newAssignments[otherBotId] = newAssignments[otherBotId].filter(
              (index) => index !== targetIndex
            );
          }
        });

        newAssignments[botId] = [...currentBotTargets, targetIndex];
      }

      return newAssignments;
    });
  };

  return (
    <Modal title="Assign Targets to Bots" onClose={onClose}>
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {bots.map((bot) => (
          <div key={bot.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="font-medium mb-3 text-lg">{bot.email}</div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {targetLinks.map((link, index) => {
                const botTargets = assignments[bot.id] || [];
                const isAssignedToThisBot = botTargets.includes(index);
                const isAssignedToOtherBot = isTargetUsed(index, bot.id);

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded ${
                      isAssignedToOtherBot ? "opacity-50" : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`${bot.id}-${index}`}
                      checked={isAssignedToThisBot}
                      disabled={isAssignedToOtherBot}
                      onChange={(e) => {
                        handleTargetToggle(bot.id, index);
                      }}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={`${bot.id}-${index}`}
                      className={`flex-1 cursor-pointer ${
                        isAssignedToOtherBot
                          ? "text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {link.name || link.url}
                      {isAssignedToOtherBot && (
                        <span className="text-xs text-gray-500 ml-2">
                          (assigned to another bot)
                        </span>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {(assignments[bot.id] || []).length} target
              {(assignments[bot.id] || []).length !== 1 ? "s" : ""} assigned
            </div>
          </div>
        ))}

        <div className="pt-4 space-x-2 border-t">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              handleSave(assignments);
              onClose();
            }}
          >
            Save Assignments
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignTargetsModal;

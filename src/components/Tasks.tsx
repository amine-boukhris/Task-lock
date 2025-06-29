import TaskItem from "./TaskItem2";

export default function Tasks() {
  return (
    <div className="border-2 border-neutral-800 px-6 py-6 max-w-6xl mx-auto rounded-xl bg-neutral-50 aspect-video">
      <div className="w-1/2 mx-auto space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl text-neutral-700">Active Tasks</h2>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl text-neutral-700">Completed</h2>
          {/* <p className="text-neutral-600">you don't have any completed tasks</p> */}
          <TaskItem />
          <TaskItem />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl text-neutral-700">Cancelled</h2>
          {/* <p className="text-neutral-600">you don't have any cancelled tasks</p> */}
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </div>
      </div>
    </div>
  );
}

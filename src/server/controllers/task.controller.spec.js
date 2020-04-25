import { TaskController } from './task.controller'
;(async () => {
  const now = Date.now()
  const taskId = `T${now}`
  console.info(`Running Tests ${now}`)
  await TaskController.addNewTask({
    name: `Task name ${now}`,
    id: taskId,
    group: 'G1',
    owner: 'U1',
    isComplete: false,
  })
  const task = await TaskController.findTask(taskId)
  console.log('>>> Created Task:', task)

  const update = {
    id: taskId,
    name: `UPDATED Task Name ${Date.now()}`,
    isComplete: true,
  }
  await TaskController.updateTask(task.id, update)
  const updatedTask = await TaskController.findTask(taskId)
  console.log('>>> Updated Task', updatedTask)
})()

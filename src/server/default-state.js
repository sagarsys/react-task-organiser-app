export const defaultState = {
  users: [{
    id: 'U1',
    name: 'root'
  }, {
    id: 'U2',
    name: 'sagar'
  }, {
    id: 'U3',
    name: 'dev'
  }, {
    id: 'U4',
    name: 'test'
  }],
  groups: [{
    name: 'TODO',
    id: 'G1',
    owner: 'U1'
  }, {
    name: 'In progress',
    id: 'G2',
    owner: 'U1'
  }, {
    name: 'COMPLETED',
    id: 'G3',
    owner: 'U1'
  }],
  tasks: [{
    name: 'Test',
    id: 'T1',
    group: 'G1',
    owner: 'U4',
    isComplete: false
  }, {
    name: 'Dev',
    id: 'T2',
    group: 'G2',
    owner: 'U2',
    isComplete: false
  }, {
    name: 'Setup',
    id: 'T3',
    group: 'G3',
    owner: 'U3',
    isComplete: false
  }, {
    name: 'Refactor tests',
    id: 'T4',
    group: 'G1',
    owner: 'U1',
    isComplete: false,
  }, {
    name: 'Meet with CTO',
    id: 'T5',
    group: 'G1',
    owner: 'U1',
    isComplete: true,
  }, {
    name: 'Compile ES6',
    id: 'T6',
    group: 'G2',
    owner: 'U2',
    isComplete: false,
  }, {
    name: 'Update component snapshots',
    id: 'T7',
    group: 'G2',
    owner: 'U1',
    isComplete: true,
  }, {
    name: 'Production optimizations',
    id: 'T8',
    group: 'G3',
    owner: 'U1',
    isComplete: false,
  }],
  comments: [{
    owner: 'U1',
    id: 'C1',
    task: 'T1',
    content: 'Great!'
  }]
}

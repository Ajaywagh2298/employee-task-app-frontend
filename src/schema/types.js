// types.ts
export interface SubTask {
    id: string;
    name: string;
    status: string;
    createDate: Date;
    assignedDevelopers: string[];
}

export interface TestCase {
    id: string;
    name: string;
    status: string;
    expectedOutput: string;
    actualOutput: string;
    developerRemark: string;
    testerRemark: string;
}

export interface Test {
    id: string;
    name: string;
    status: string;
    createDate: Date;
    deviceType: string;
    assignedTesters: string[];
    efficiency: number;
    testCases: TestCase[];
}

export interface Task {
    id: string;
    taskName: string;
    taskDescription: string;
    status: string;
    createDate: Date;
    developers: string[];
    testers: string[];
    participants : string[];
    fromDate : string[];
    toDate : string[];
    subTaskList: SubTask[];
    tests: Test[];
}

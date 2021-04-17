document = {};
chance = {};

var saveIssue;

const element = {};
element.addEventListener = jest.fn((name, eventListener) => {
    saveIssue = eventListener;
});
document.getElementById = jest.fn().mockReturnValueOnce(element);

require('../src/main.js');

describe('main.test', () => {

test('Добавление первой записи', () => {
    //Arrange
    expect.hasAssertions();
    
    localStorage.clear();
    const expectedIssue = {
        id: '1111-2222-3333-4444',
        description: 'Тест',
        severity: 'Low',
        assignedTo: 'Пользователь',
        status: 'Open'
    };
    const expectedIssues = [];
    expectedIssues.push(expectedIssue);

    const issuesList = {};
    const elements = jest.fn();
    elements.mockReturnValueOnce({ value: expectedIssue.description })
            .mockReturnValueOnce({ value: expectedIssue.severity })
            .mockReturnValueOnce({ value: expectedIssue.assignedTo })
            .mockReturnValueOnce({ reset: function () { } })
            .mockReturnValueOnce(issuesList);
    document.getElementById = elements;
    chance.guid = jest.fn().mockReturnValueOnce(expectedIssue.id);
    const event = {};
    event.preventDefault = jest.fn();

    //Act
    saveIssue(event);

    //Assert
    const issues = JSON.parse(localStorage.getItem('issues'));
    expect(issues).toEqual(expectedIssues);

    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedIssue.id));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedIssue.description));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedIssue.severity));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedIssue.assignedTo));

    expect(elements.mock.calls.length).toBe(5);
});

test('Добавление к существующему хранилищу', () => {

    //Arrange
    expect.hasAssertions();

    localStorage.clear();
    const expectedIssues = [];
    const expectedOldIssue = {
        id: '0000-0000-0000-0002',
        description: 'Новая запись',
        severity: 'Low',
        assignedTo: 'Пользователь 2',
        status: 'Open'
    };    
    expectedIssues.push(expectedOldIssue);
    localStorage.setItem('issues', JSON.stringify(expectedIssues));
    
    const expectedNewIssue = {
        id: '0000-0000-0000-0002',
        description: 'Новая запись',
        severity: 'Low',
        assignedTo: 'Пользователь 2',
        status: 'Open'
    };
    expectedIssues.push(expectedNewIssue);

    const issuesList = {};
    const elements = jest.fn();
    elements.mockReturnValueOnce({ value: expectedNewIssue.description })
            .mockReturnValueOnce({ value: expectedNewIssue.severity })
            .mockReturnValueOnce({ value: expectedNewIssue.assignedTo })
            .mockReturnValueOnce({ reset: function () { } })
            .mockReturnValueOnce(issuesList);
    document.getElementById = elements;
    chance.guid = jest.fn().mockReturnValueOnce(expectedNewIssue.id);
    const event = {};
    event.preventDefault = jest.fn();

    //Act
    saveIssue(event);

    //Assert
    const issues = JSON.parse(localStorage.getItem('issues'));
    expect(issues).toEqual(expectedIssues);

    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedOldIssue.id));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedOldIssue.description));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedOldIssue.severity));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedOldIssue.assignedTo));

    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedNewIssue.id));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedNewIssue.description));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedNewIssue.severity));
    expect(issuesList.innerHTML).toEqual(expect.stringContaining(expectedNewIssue.assignedTo));

    expect(elements.mock.calls.length).toBe(5);
});
});
import renderer from 'react-test-renderer';
import Dashboard from './index';
import {AppContext} from "../../utils/context";

const setSpinnerLoading = jest.fn();
const setMessageData = jest.fn();
const MyComponent = () =>
    <AppContext.Provider value={{setSpinnerLoading, setMessageData}}>
        <Dashboard/>
    </AppContext.Provider>

jest.mock("antd", () => {
    const lib = jest.requireActual("antd");

    return {
        ...lib,
        Tabs: () => <div></div>,
    };
});

describe("Dashboard Tests", () => {
    it('Matches DOM Snapshot', () => {
        const tree = renderer
            .create(<MyComponent/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
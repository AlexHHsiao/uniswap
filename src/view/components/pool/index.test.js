import renderer from 'react-test-renderer';
import Pool from './index';
import {AppContext} from "../../../utils/context";

const setSpinnerLoading = jest.fn();
const setMessageData = jest.fn();
const MyComponent = () =>
    <AppContext.Provider value={{setSpinnerLoading, setMessageData}}>
        <Pool/>
    </AppContext.Provider>

describe("Pool Tests", () => {
    it('Matches DOM Snapshot', () => {
        const tree = renderer
            .create(<MyComponent/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
import renderer from 'react-test-renderer';
import Token from './index';
import {AppContext} from "../../../utils/context";

const setSpinnerLoading = jest.fn();
const setMessageData = jest.fn();
const MyComponent = () =>
    <AppContext.Provider value={{setSpinnerLoading, setMessageData}}>
        <Token/>
    </AppContext.Provider>

describe("Token Tests", () => {
    it('Matches DOM Snapshot', () => {
        const tree = renderer
            .create(<MyComponent/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
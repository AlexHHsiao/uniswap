import renderer from 'react-test-renderer';
import LandingPage from './index';

describe("LandingPage Tests", () => {
    it('Matches DOM Snapshot', () => {
        const tree = renderer
            .create(<LandingPage/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});


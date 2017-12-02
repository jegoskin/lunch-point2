import { getMuiTheme, lightBaseTheme as base } from 'material-ui/styles';

//colors
import { blue400 as primary1Color } from 'material-ui/styles/colors';

const theme = getMuiTheme(base, {
	palette: {
		primary1Color
	}
});

export default theme;
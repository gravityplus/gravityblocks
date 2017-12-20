const { __ } = wp.i18n;
const Component = wp.element.Component;
const { IconButton } = wp.components;

import Rule from '../rule/';

export default class Ruleset extends Component {

	constructor() {

		super( ...arguments );

		this.addRule = this.addRule.bind( this );
		this.deleteRule = this.deleteRule.bind( this );
		this.updateRule = this.updateRule.bind( this );

	}

	addRule() {

		let rules = this.getRules(),
			newRules = rules.push( { key: '', operator: '', value: '' } );

		this.setRules( newRules );

	}

	deleteRule( index ) {

		let rules = this.getRules();
		rules.splice( index, 1 );

		this.setRules( rules );

	}

	getRules() {

		return this.props.rules;

	}

	setRules( rules ) {

		this.props.onChange( rules );

		this.forceUpdate();

	}

	updateRule( rule, index ) {

		let rules = this.getRules();

		rules[ index ] = rule;

		this.props.onChange( rules );

	}

	render() {

		let rules = this.props.rules;

		return [
			rules && (
				rules.map( ( rule, index ) => <Rule rule={rule} key={index} index={index}
													updateRule={this.updateRule}
													deleteRule={this.deleteRule}/> )
			),
			<IconButton
				key="icon"
				icon="insert"
				label={__( 'Add Rule' )}
				onClick={this.addRule}
				className="editor-inserter__toggle"/>
		];

	}

}
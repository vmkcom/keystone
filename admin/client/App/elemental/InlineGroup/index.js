import { css, StyleSheet } from 'aphrodite/no-important';
import React, { cloneElement, Children, Component, PropTypes } from 'react';

// NOTE: only accepts InlineGroupSection as a single child

function InlineGroup ({
	block,
	children,
	className,
	component,
	contiguous,
	...props,
}) {

	// set the component
	const Component = component;

	// prepare group className
	props.className = css(
		classes.group,
		!!block && classes.block,
		className
	);

	// convert children to an array and filter out falsey values
	const buttons = Children.toArray(children).filter(i => i);

	// normalize the count
	const count = buttons.length - 1;

	// clone children and apply classNames that aphrodite can target
	props.children = buttons.map((c, idx) => {
		if (!c) return null;

		const isOnlyChild = !count;
		const isFirstChild = !isOnlyChild && idx === 0;
		const isLastChild = !isOnlyChild && idx === count;
		const isMiddleChild = !isOnlyChild && !isFirstChild && !isLastChild;

		let position;
		if (isOnlyChild) position = 'only';
		if (isFirstChild) position = 'first';
		if (isLastChild) position = 'last';
		if (isMiddleChild) position = 'middle';

		return cloneElement(c, {
			contiguous: contiguous,
			position,
		});
	});

	return <Component {...props} />;
};

InlineGroup.propTypes = {
	block: PropTypes.bool,
	component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),
	contiguous: PropTypes.bool,
};
InlineGroup.defaultProps = {
	component: 'div',
};

const classes = StyleSheet.create({
	group: {
		display: 'inline-flex',
	},
	block: {
		display: 'flex',
	},
});

module.exports = InlineGroup;
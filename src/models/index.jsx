import React from 'react';
import I18n from './i18n';

function compose(...containers) {
  return function Component(props) {
    return containers.reduceRight((children, Container) => <Container.Provider>{children}</Container.Provider>, props.children);
  };
}

const ComposedStore = compose(
  I18n,
);

function Store({ children }) {
  console.log('global contexts have been re-rendered at: ' + Date.now());

  return (
    <ComposedStore>
      {children}
    </ComposedStore>
  );
}

function connect(models) {
  return function linkMap(mapStateToProps) {
    return function wrapComponent(Component) {
      return function ConnectComponet(props) {
        const state = mapStateToProps(models.map(model => model.useContainer()));
        return (
          <Component {...props} {...state} />
        );
      };
    };
  };
}

export default React.memo(Store);
export {
  connect,
};

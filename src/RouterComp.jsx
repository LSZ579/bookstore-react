import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

function RouterComp(props) {
  let {
    routes
  } = props;
  //这里是将所有是重定向的项找出来
  let redir = routes && routes.length > 0 && routes.filter((v, i) => {
    return v.redirect 
  })
  //将重定向的组件渲染出来
  let renderRedir = redir.length > 0 && redir.map((v, i) => {
    return <Redirect from={v.path} to={v.redirect} key={i} />
  })
  return (
    <Switch>
      {
      //这里将所有的Route按照它的path和对应的组件渲染
        routes && routes.length > 0 && routes.map((v, i) => {
          if (v.component) {
            return <Route key={i} path={v.path} component={(props) => {
            	//这里我们将children也就是下一级路由传下去方便在下一级路由使用
              return <v.component routes={v.children} {...props} />
            }} />
          }
          //这里我们将重定向的组件加到里面
        }).concat(renderRedir)
      }
    </Switch>  
  )
}

export default RouterComp

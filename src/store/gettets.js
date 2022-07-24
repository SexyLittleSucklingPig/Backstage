export default {
  user: state => state.user.token,
  usrlist: state => state.userlist.userlist,
  RoleList: state => state.Roles.RoleList,
  privilege: state => state.Roles.privilege, // 树状数据
  taglist: state => state.Roles.taglist,
  Classificationlist: state => state.goods.Classificationlist, // 商品分类数据
  parameterlist: state => state.goods.parameterlist // 分类参数
}
